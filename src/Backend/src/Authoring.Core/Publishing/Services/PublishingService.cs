using System.Text.Json.Nodes;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Extensions;
using Confix.Authoring.Messaging;
using Confix.Authoring.Publishing.Authorization;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;
using Confix.Common.Exceptions;
using Confix.CryptoProviders;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring.Publishing;

// TODO cleanup this service. Most of the service depenencies here are wrong
// the publishing service should go directly to the DL or stores and only use
// helpers like the ISchemaService (also, this "service" should have a different name)
internal sealed class PublishingService : IPublishingService
{
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;
    private readonly IApplicationStore _applicationStore;
    private readonly IAuthorizationService _authorizationService;
    private readonly IComponentDataLoader _componentDataLoader;
    private readonly IVariableStore _variableStore;
    private readonly IVariableValueStore _variableValueStore;
    private readonly IComponentService _componentService;
    private readonly IChangeLogService _changeLogService;
    private readonly IEncryptor _encryptor;
    private readonly IDecryptor _decryptor;
    private readonly IDataLoader<Guid, Environment> _environmentById;
    private readonly IEnvironmentStore _environmentStore;
    private readonly IPublishedApplicationPartByIdDataloader _publishedApplicationPartById;
    private readonly IPublishedApplicationPartsByPartIdDataloader
        _publishedApplicationPartsByPartId;
    private readonly IDataLoader<Guid, PublishedApplicationPart?> _publishedById;
    private readonly IPublishingStore _publishingStore;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly ICreateVaultConfigClient _createVaultConfig;

    public PublishingService(
        IDataLoader<Guid, PublishedApplicationPart?> publishedById,
        IPublishedApplicationPartsByPartIdDataloader publishedApplicationPartsByPartId,
        IApplicationStore applicationStore,
        IDataLoader<Guid, Environment> environmentById,
        IComponentDataLoader componentDataLoader,
        ISessionAccessor sessionAccessor,
        IPublishingStore publishingStore,
        IEncryptor encryptor,
        IComponentService componentService,
        IAuthorizationService authorizationService,
        IApplicationByPartIdDataLoader applicationByPartId,
        IPublishedApplicationPartByIdDataloader publishedApplicationPartById,
        IChangeLogService changeLogService,
        IEnvironmentStore environmentStore,
        IVariableStore variableStore,
        ICreateVaultConfigClient createVaultConfig,
        IDecryptor decryptor,
        IVariableValueStore variableValueStore)
    {
        _publishedById = publishedById;
        _publishedApplicationPartsByPartId = publishedApplicationPartsByPartId;
        _applicationStore = applicationStore;
        _environmentById = environmentById;
        _componentDataLoader = componentDataLoader;
        _sessionAccessor = sessionAccessor;
        _publishingStore = publishingStore;
        _componentService = componentService;
        _authorizationService = authorizationService;
        _applicationByPartId = applicationByPartId;
        _publishedApplicationPartById = publishedApplicationPartById;
        _changeLogService = changeLogService;
        _environmentStore = environmentStore;
        _variableStore = variableStore;
        _createVaultConfig = createVaultConfig;
        _decryptor = decryptor;
        _variableValueStore = variableValueStore;
        _encryptor = encryptor;
    }

    public async Task<PublishedApplicationPart> PublishPartByIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        var session = await _authorizationService.EnsureAuthenticated(cancellationToken);

        var application = await _applicationStore.GetByPartIdAsync(partId, cancellationToken);

        var applicationPart = application?.Parts.FirstOrDefault(x => x.Id == partId);

        if (application is null || applicationPart is null)
        {
            throw ThrowHelper.PublishingFailedBecauseApplicationPartWasNotFound(partId);
        }

        if (!await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedAsync(applicationPart, Read, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var configuration =
            await BuildConfigurationForPartAsync(applicationPart, cancellationToken);

        var userInfo = session.UserInfo;

        using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            application =
                await PublishApplicationPartAsync(applicationPart.Id, cancellationToken);

            applicationPart = application.Parts.Single(x => x.Id == applicationPart.Id);

            var published = new PublishedApplicationPart(
                Guid.NewGuid(),
                applicationPart.Version,
                applicationPart,
                configuration,
                DateTime.UtcNow,
                userInfo);

            await _publishingStore.CreateAsync(published, cancellationToken);
            scope.Complete();

            return published;
        }
    }

    public async Task<IReadOnlyList<PublishedApplicationPart>> GetPublishedByPartId(
        Guid partId,
        CancellationToken cancellationToken)
    {
        var part = await _applicationByPartId.LoadAsync(partId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<PublishedApplicationPart>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<PublishedApplicationPart>();
        }

        return await _publishedApplicationPartsByPartId.LoadAsync(partId, cancellationToken) ??
            Array.Empty<PublishedApplicationPart>();
    }

    public async Task<IReadOnlyList<Environment>> GetDeployedEnvironmentByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        var part = await _applicationByPartId.LoadAsync(partId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<Environment>();
        }

        var environmentIds =
            await _publishingStore.GetDeployedEnvironmentsByPartIdAsync(partId, cancellationToken);

        return await _environmentById.LoadAsync(environmentIds.ToArray(), cancellationToken);
    }

    public async Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionByPublishedPartIdAsync(
        Guid publishedApplicationId,
        CancellationToken cancellationToken)
    {
        var part = await _publishedApplicationPartById
            .LoadAsync(publishedApplicationId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<PublishedApplicationPart>()
                .IsAuthorizedAsync(part, Read, cancellationToken))
        {
            return Array.Empty<ClaimedVersion>();
        }

        return await _publishingStore
            .GetClaimedVersionByPublishingIdAsync(publishedApplicationId, cancellationToken);
    }

    public async Task<PublishedApplicationPart?> GetPublishedById(
        Guid id,
        CancellationToken cancellationToken)
    {
        var part = await _publishedById.LoadAsync(id, cancellationToken);

        return await _authorizationService
            .RuleFor<PublishedApplicationPart>()
            .AuthorizeOrNullAsync(part, Read, cancellationToken);
    }

    public async Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionAsync(
        Guid partId,
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        var part = await _applicationByPartId.LoadAsync(partId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<PublishedApplicationPart>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<ClaimedVersion>();
        }

        return await _publishingStore
            .GetClaimedVersionAsync(partId, environmentId, cancellationToken);
    }

    public async Task<ClaimedVersion?> ClaimVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        var env = await _environmentStore.GetByNameAsync(environmentName, cancellationToken);

        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        if (env is null)
        {
            throw ThrowHelper.ClaimFailedBecauseEnvWasNotFound(applicationName,
                applicationPartName,
                environmentName);
        }

        var app = await _applicationStore
            .FindByApplicationNameAsync(applicationName, cancellationToken);

        if (app is null)
        {
            throw ThrowHelper.ClaimFailedBecauseApplicationWasNotFound(
                applicationName,
                applicationPartName);
        }

        if (!await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(app, Claim, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var part = app.Parts.FirstOrDefault(x => x.Name == applicationPartName);

        if (part is null)
        {
            throw ThrowHelper
                .ClaimFailedBecauseApplicationPartWasNotFound(applicationName, applicationPartName);
        }

        var version = await _publishingStore
            .GetClaimedVersionAsync(part.Id, env.Id, gitVersion, cancellationToken);

        if (version is not null)
        {
            return version;
        }

        var claimedVersion = await _publishingStore
            .GetClaimedVersionByGitVersionAsync(gitVersion, app.Id, part.Id, cancellationToken);

        PublishedApplicationPart? publishedApplicationPart = null;

        if (claimedVersion?.PublishingId is { } publishingId)
        {
            publishedApplicationPart =
                await _publishingStore.GetPublishedPartByIdAsync(publishingId, cancellationToken);
        }
        else
        {
            publishedApplicationPart = await _publishingStore
                .GetMostRecentByApplicationPartIdAsync(part.Id, cancellationToken);
        }

        if (publishedApplicationPart is null)
        {
            throw ThrowHelper.ClaimFailedBecauseNoPublishedConfigurationWasFound(
                applicationName,
                applicationPartName,
                environmentName);
        }

        var variableReplaced = await ReplaceVariableValuesAsync(
            app,
            part,
            env,
            publishedApplicationPart.Configuration,
            cancellationToken);

        var cryptoProvider = InMemoryCryptoProvider.New();

        var token = await _createVaultConfig.ExecuteAsync(
            new(app.Name!,
                part.Name!,
                environmentName,
                cryptoProvider.EncryptAsync(variableReplaced).Serialize()),
            cancellationToken);

        version = new ClaimedVersion(
            Guid.NewGuid(),
            gitVersion,
            app.Id,
            part.Id,
            env.Id,
            publishedApplicationPart.Id,
            await _encryptor.EncryptAsync(
                "token",
                token.AccessToken,
                env.Id,
                cancellationToken),
            await _encryptor.EncryptAsync(
                "refreshToken",
                token.RefreshToken,
                env.Id,
                cancellationToken),
            await _encryptor.EncryptAsync(
                "decryptionKey",
                cryptoProvider.KeyBase64,
                env.Id,
                cancellationToken),
            DateTime.UtcNow);

        version = await _publishingStore
            .CreateClaimedVersionAsync(version, cancellationToken);

        if (version is null)
        {
            throw ThrowHelper.ClaimFailedBecauseOtherClaimAlreadyInProgress(
                applicationName,
                applicationPartName,
                environmentName);
        }

        return version;
    }

    public async Task<string> BuildLatestPublishedVersion(
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        var env = await _environmentStore.GetByNameAsync(environmentName, cancellationToken);

        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        if (env is null)
        {
            throw ThrowHelper.ClaimFailedBecauseEnvWasNotFound(applicationName,
                applicationPartName,
                environmentName);
        }

        var app = await _applicationStore
            .FindByApplicationNameAsync(applicationName, cancellationToken);

        if (app is null)
        {
            throw ThrowHelper.ClaimFailedBecauseApplicationWasNotFound(
                applicationName,
                applicationPartName);
        }

        if (!await _authorizationService
                .RuleFor<DeveloperAccessRequest>()
                .IsAuthorizedAsync(new(env, app), Read, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var part = app.Parts.FirstOrDefault(x => x.Name == applicationPartName);

        if (part is null)
        {
            throw ThrowHelper
                .ClaimFailedBecauseApplicationPartWasNotFound(applicationName, applicationPartName);
        }

        var publishedApplicationPart = await _publishingStore
            .GetMostRecentByApplicationPartIdAsync(part.Id, cancellationToken);

        if (publishedApplicationPart is null)
        {
            throw ThrowHelper.ClaimFailedBecauseNoPublishedConfigurationWasFound(
                applicationName,
                applicationPartName,
                environmentName);
        }

        return await ReplaceVariableValuesAsync(
            app,
            part,
            env,
            publishedApplicationPart.Configuration,
            cancellationToken);
    }

    private async Task<string> BuildConfigurationForPartAsync(
        ApplicationPart part,
        CancellationToken cancellationToken)
    {
        var componentLookup = await LoadComponentsAsync(part, cancellationToken);
        var document = new JsonObject();

        foreach (var partComponent in part.Components)
        {
            var component = componentLookup.GetComponent(partComponent.ComponentId);
            var serializedValues = await BuildComponentValuesAsync(
                part,
                component,
                partComponent.Values,
                cancellationToken);

            document.Add(component.Name!, serializedValues);
        }

        return document.ToJsonString();
    }

    private async Task<string> ReplaceVariableValuesAsync(
        Application app,
        ApplicationPart part,
        Environment environment,
        string? values,
        CancellationToken cancellationToken)
    {
        if (values is null || JsonNode.Parse(values) is not JsonObject jsonObject)
        {
            throw new ArgumentException("Could not parse values.", nameof(values));
        }

        JsonVariableVisitorContext context = new();
        JsonVariableVisitor.Default.Visit(jsonObject, context);

        var variableNames = context.Variables.Select(x => x.VariableName).Distinct().ToArray();

        var resolvesValues = await GetBestMatchingValuesAsync(
            app,
            variableNames,
            app.Id,
            part.Id,
            environment.Id,
            cancellationToken);

        foreach (var variable in context.Variables)
        {
            if (!resolvesValues.TryGetValue(variable.VariableName, out var value))
            {
                throw ThrowHelper.ClaimFailedBecauseVariableValueWasNotPresent(
                    part,
                    environment.Name,
                    variable.VariableName);
            }

            var decryptedValue =
                await _decryptor.DecryptAsync(value.EncryptedValue, cancellationToken);

            variable.SetValue(JsonValue.Create(decryptedValue)!);
        }

        return jsonObject.ToJsonString();
    }

    private async Task<JsonObject> BuildComponentValuesAsync(
        ApplicationPart part,
        Component component,
        string? values,
        CancellationToken cancellationToken)
    {
        if (values is null || JsonNode.Parse(values) is not JsonObject jsonObject)
        {
            throw ThrowHelper.PublishingFailedBecauseComponentValuesWereNotPresent(part, component);
        }

        var violations = await _componentService
            .GetSchemaViolationsAsync(component.Id, values, cancellationToken);

        if (violations.Count > 0)
        {
            throw ThrowHelper
                .PublishingFailedBecauseValuesDidNotMatchSchema(part, component, violations);
        }

        JsonVariableVisitorContext context = new();
        JsonVariableVisitor.Default.Visit(jsonObject, context);

        var variableNames = context.Variables.Select(x => x.VariableName).ToArray();
        var variables = await _variableStore.GetByNamesAsync(variableNames, cancellationToken);

        var variableLookup = variables
            .Where(x => x is not null)
            .DistinctBy(x => x!.Name)
            .ToDictionary(x => x!.Name);

        foreach (var variable in context.Variables)
        {
            if (!variableLookup.TryGetValue(variable.VariableName, out _))
            {
                throw ThrowHelper
                    .PublishingFailedBecauseVariableValueWasNotPresent(
                        part,
                        component,
                        variable.VariableName);
            }
        }

        return jsonObject;
    }

    private async Task<ComponentLookup> LoadComponentsAsync(
        ApplicationPart part,
        CancellationToken cancellationToken)
    {
        var componentIds = part.Components.Select(x => x.ComponentId).ToArray();
        var components = await _componentDataLoader.LoadAsync(componentIds, cancellationToken);

        return new ComponentLookup(components, part);
    }

    private class ComponentLookup
    {
        private readonly IDictionary<Guid, Component> _components;
        private readonly ApplicationPart _part;

        public ComponentLookup(IEnumerable<Component?> components, ApplicationPart part)
        {
            _part = part;
            _components = components.OfType<Component>().ToDictionary(x => x.Id);
        }

        public Component GetComponent(Guid componentId)
        {
            return _components.TryGetValue(componentId, out var component)
                ? component
                : throw ThrowHelper.PublishingFailedBecauseComponentWasNotFound(_part, componentId);
        }
    }

    private async Task<Application> PublishApplicationPartAsync(
        Guid applicationPartId,
        CancellationToken cancellationToken = default)
    {
        var application =
            await _applicationStore.GetByPartIdAsync(applicationPartId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedFromAsync(application, Publish, cancellationToken))
        {
            throw new ApplicationPartNotFoundException(applicationPartId);
        }

        var applicationPart = application?.Parts.FirstOrDefault(x => x.Id == applicationPartId);

        if (application is null || applicationPart is null)
        {
            throw new ApplicationPartNotFoundException(applicationPartId);
        }

        var updatedApplicationPart = applicationPart with { Version = applicationPart.Version + 1 };

        application = application with
        {
            Version = application.Version + 1,
            Parts = application.Parts.Replace(applicationPart, () => updatedApplicationPart)
        };

        PublishedApplicationPartChange log = new(
            application.Id,
            application.Version,
            updatedApplicationPart.Id,
            updatedApplicationPart.Version);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _applicationStore.ReplaceAsync(application, cancellationToken);

            transaction.Complete();
        }

        return application;
    }

    private async Task<IDictionary<string, VariableValue>> GetBestMatchingValuesAsync(
        Application app,
        IEnumerable<string> variableNames,
        Guid applicationId,
        Guid applicationPartId,
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        ISet<string> distinctNames = variableNames.ToHashSet();

        var variables = await _variableStore.GetByNamesAsync(distinctNames, cancellationToken);

        IDictionary<string, VariableValue> values = new Dictionary<string, VariableValue>();

        var variableLookup = variables.OfType<Variable>().ToDictionary(x => x.Id);

        var applicationAndEnvScope =
            new ApplicationVariableValueScope(environmentId, applicationId);
        var applicationPartAndEnvScope =
            new ApplicationPartVariableValueScope(environmentId, applicationPartId);
        var namespaceAndEnvScope =
            new NamespaceVariableValueScope(environmentId, app.Namespace);
        var applicationScope =
            new ApplicationVariableValueScope(null, applicationId);
        var applicationPartScope =
            new ApplicationPartVariableValueScope(null, applicationPartId);
        var namespaceScope =
            new NamespaceVariableValueScope(null, app.Namespace);

        var possibleValues =
            await _variableValueStore.GetByFilterAsync(
                variables.Select(x => x.Id).Distinct(),
                new VariableValueScope[]
                {
                    applicationAndEnvScope,
                    applicationPartAndEnvScope,
                    namespaceAndEnvScope,
                    applicationScope,
                    applicationPartScope,
                    namespaceScope
                },
                cancellationToken);

        var lookupByScope = possibleValues.ToLookup(x => x.Scope);
        var lookupAppAndEnv = lookupByScope[applicationAndEnvScope].ToDictionary(x => x.VariableId);
        var lookupPartAndEnv =
            lookupByScope[applicationPartAndEnvScope].ToDictionary(x => x.VariableId);
        var lookupNamespaceAndEnv =
            lookupByScope[namespaceAndEnvScope].ToDictionary(x => x.VariableId);
        var lookupApplication = lookupByScope[applicationScope].ToDictionary(x => x.VariableId);
        var lookupApplicationPart =
            lookupByScope[applicationPartScope].ToDictionary(x => x.VariableId);
        var lookupNamespace = lookupByScope[namespaceScope].ToDictionary(x => x.VariableId);

        foreach (var (id, variable) in variableLookup)
        {
            VariableValue? result;
            if (lookupPartAndEnv.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }

            if (lookupAppAndEnv.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }

            if (lookupNamespaceAndEnv.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }

            if (lookupApplicationPart.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }

            if (lookupApplication.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }

            if (lookupNamespace.TryGetValue(id, out result))
            {
                values.Add(variable.Name, result);
                continue;
            }
        }

        return values;
    }
}
