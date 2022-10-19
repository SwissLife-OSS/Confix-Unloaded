using System.Text.Json.Nodes;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using Confix.CryptoProviders;
using Confix.Vault.Client;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring.Publishing;

internal sealed class PublishingService : IPublishingService
{
    private readonly IDataLoader<Guid, PublishedApplicationPart?> _publishedById;
    private readonly IPublishedApplicationPartsByPartIdDataloader
        _publishedApplicationPartsByPartId;
    private readonly IPublishedApplicationPartByIdDataloader _publishedApplicationPartById;
    private readonly IApplicationService _applicationService;
    private readonly IEnvironmentService _environmentService;
    private readonly IComponentDataLoader _componentDataLoader;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IPublishingStore _publishingStore;
    private readonly IAuthorizationService _authorizationService;
    private readonly IVariableService _variableService;
    private readonly IComponentService _componentService;
    private readonly IVaultClient _vaultClient;
    private readonly IEncryptor _encryptor;
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;

    public PublishingService(
        IDataLoader<Guid, PublishedApplicationPart?> publishedById,
        IPublishedApplicationPartsByPartIdDataloader publishedApplicationPartsByPartId,
        IApplicationService applicationService,
        IEnvironmentService environmentService,
        IComponentDataLoader componentDataLoader,
        ISessionAccessor sessionAccessor,
        IPublishingStore publishingStore,
        IEncryptor encryptor,
        IVariableService variableService,
        IVaultClient vaultClient,
        IComponentService componentService,
        IAuthorizationService authorizationService,
        IApplicationByPartIdDataLoader applicationByPartId,
        IPublishedApplicationPartByIdDataloader publishedApplicationPartById)
    {
        _publishedById = publishedById;
        _publishedApplicationPartsByPartId = publishedApplicationPartsByPartId;
        _applicationService = applicationService;
        _environmentService = environmentService;
        _componentDataLoader = componentDataLoader;
        _sessionAccessor = sessionAccessor;
        _publishingStore = publishingStore;
        _variableService = variableService;
        _componentService = componentService;
        _authorizationService = authorizationService;
        _applicationByPartId = applicationByPartId;
        _publishedApplicationPartById = publishedApplicationPartById;
        _vaultClient = vaultClient;
        _encryptor = encryptor;
    }

    public async Task<PublishedApplicationPart> PublishPartByIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        var session = await _authorizationService.EnsureAuthenticated(cancellationToken);

        var application = await _applicationService.GetByPartIdAsync(partId, cancellationToken);

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
            await BuildConfigurationForPartAsync(application, applicationPart, cancellationToken);

        var userInfo = session.UserInfo;

        using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            application = await _applicationService
                .PublishApplicationPartAsync(applicationPart.Id, cancellationToken);

            applicationPart = application.Parts.Single(x => x.Id == applicationPart.Id);

            PublishedApplicationPart published =
                new(Guid.NewGuid(),
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
        var part = _applicationByPartId.LoadAsync(partId, cancellationToken);
        if (!await _authorizationService
                .RuleFor<PublishedApplicationPart>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<PublishedApplicationPart>();
        }

        return await _publishedApplicationPartsByPartId.LoadAsync(partId, cancellationToken)
            ?? Array.Empty<PublishedApplicationPart>();
    }

    public async Task<IReadOnlyList<Environment>> GetDeployedEnvironmentByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        var part = _applicationByPartId.LoadAsync(partId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<Environment>();
        }

        var environmentIds = await _publishingStore
            .GetDeployedEnvironmentsByPartIdAsync(partId, cancellationToken);

        return await _environmentService.GetByIdsAsync(environmentIds, cancellationToken);
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
        var part = _applicationByPartId.LoadAsync(partId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<PublishedApplicationPart>()
                .IsAuthorizedFromAsync(part, Read, cancellationToken))
        {
            return Array.Empty<ClaimedVersion>();
        }

        return await _publishingStore
            .GetClaimedVersionAsync(partId, environmentId, cancellationToken);
    }

    public async Task<ClaimedVersion> ClaimVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        var env = await _environmentService.GetByNameAsync(environmentName, cancellationToken);

        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        if (env is null)
        {
            throw ThrowHelper.ClaimFailedBecauseEnvWasNotFound(
                applicationName,
                applicationPartName,
                environmentName);
        }

        var app = await _applicationService
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
            throw new OperationCanceledException();
        }

        var part = app.Parts.FirstOrDefault(x => x.Name == applicationPartName);

        if (part is null)
        {
            throw ThrowHelper.ClaimFailedBecauseApplicationPartWasNotFound(
                applicationName,
                applicationPartName);
        }

        var claimedVersion = await _publishingStore
            .GetClaimedVersionByGitVersionAsync(gitVersion, app.Id, part.Id, cancellationToken);

        PublishedApplicationPart? publishedApplicationPart = null;
        if (claimedVersion?.PublishingId is { } publishingId)
        {
            publishedApplicationPart = await _publishingStore
                .GetPublishedPartByIdAsync(publishingId, cancellationToken);
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

        var version = await _publishingStore
            .GetClaimedVersionAsync(part.Id, env.Id, gitVersion, cancellationToken);

        if (version is null)
        {
            string variableReplaced = await ReplaceVariableValuesAsync(
                app,
                part,
                env,
                publishedApplicationPart.Configuration,
                cancellationToken
            );

            var token = await _vaultClient.CreateAsync(
                app.Name!,
                part.Name!,
                environmentName,
                variableReplaced,
                cancellationToken);

            version = new ClaimedVersion(
                Guid.NewGuid(),
                gitVersion,
                app.Id,
                part.Id,
                env.Id,
                publishedApplicationPart.Id,
                await _encryptor.EncryptAsync("token",
                    token.AccessToken,
                    env.Id,
                    cancellationToken),
                await _encryptor.EncryptAsync("refreshToken",
                    token.RefreshToken,
                    env.Id,
                    cancellationToken),
                DateTime.UtcNow);

            return await _publishingStore
                .GetOrCreateClaimedVersionAsync(version, cancellationToken);
        }

        return version;
    }

    private async Task<string> BuildConfigurationForPartAsync(
        Application app,
        ApplicationPart part,
        CancellationToken cancellationToken)
    {
        ComponentLookup componentLookup = await LoadComponentsAsync(part, cancellationToken);
        JsonObject document = new JsonObject();

        foreach (ApplicationPartComponent partComponent in part.Components)
        {
            Component component = componentLookup.GetComponent(partComponent.ComponentId);
            JsonObject serializedValues = await BuildComponentValuesAsync(
                app,
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

        var variableNames = context.Variables.Select(x => x.VariableName).ToArray();

        IDictionary<string, VariableValue> resolvesValues = await _variableService
            .GetBestMatchingValuesAsync(variableNames,
                app.Id,
                part.Id,
                environment.Id,
                cancellationToken);

        foreach (VariableMatch variable in context.Variables)
        {
            if (!resolvesValues.TryGetValue(variable.VariableName, out VariableValue? value))
            {
                throw ThrowHelper
                    .ClaimFailedBecauseVariableValueWasNotPresent(part,
                        environment.Name,
                        variable.VariableName);
            }

            variable.SetValue(JsonValue.Create(value.Value)!);
        }

        return jsonObject.ToJsonString();
    }

    private async Task<JsonObject> BuildComponentValuesAsync(
        Application app,
        ApplicationPart part,
        Component component,
        string? values,
        CancellationToken cancellationToken)
    {
        if (values is null || JsonNode.Parse(values) is not JsonObject jsonObject)
        {
            throw ThrowHelper.PublishingFailedBecauseComponentValuesWereNotPresent(part, component);
        }

        IReadOnlyList<SchemaViolation> violations = await _componentService
            .GetSchemaViolationsAsync(component.Id, values, cancellationToken);

        if (violations.Count > 0)
        {
            throw ThrowHelper
                .PublishingFailedBecauseValuesDidNotMatchSchema(part, component, violations);
        }

        JsonVariableVisitorContext context = new();
        JsonVariableVisitor.Default.Visit(jsonObject, context);

        var variableNames = context.Variables.Select(x => x.VariableName).ToArray();
        IEnumerable<Variable?> variables =
            await _variableService.GetByNamesAsync(variableNames, cancellationToken);

        Dictionary<string, Variable> variableLookup =
            variables.DistinctBy(x => x.Name).ToDictionary(x => x.Name);

        foreach (VariableMatch variable in context.Variables)
        {
            if (!variableLookup.TryGetValue(variable.VariableName, out Variable? value))
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
        Guid[] componentIds = part.Components.Select(x => x.ComponentId).ToArray();
        IReadOnlyList<Component?> components = await _componentDataLoader
            .LoadAsync(componentIds, cancellationToken);
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
            => _components.TryGetValue(componentId, out Component? component)
                ? component
                : throw ThrowHelper.PublishingFailedBecauseComponentWasNotFound(_part, componentId);
    }
}