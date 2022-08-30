using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using Confix.CryptoProviders;
using Confix.Vault.Client;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishingService : IPublishingService
{
    private readonly IDataLoader<Guid, PublishedApplicationPart?> _publishedById;
    private readonly IPublishedApplicationPartByPartIdDataloader _publishedApplicationPartById;
    private readonly IApplicationService _applicationService;
    private readonly IEnvironmentService _environmentService;
    private readonly IComponentDataLoader _componentDataLoader;
    private readonly IUserSessionAccessor _sessionAccessor;
    private readonly IPublishingStore _publishingStore;
    private readonly IVariableService _variableService;
    private readonly IComponentService _componentService;
    private readonly IVaultClient _vaultClient;
    private readonly IEncryptor _encryptor;

    public PublishingService(
        IDataLoader<Guid, PublishedApplicationPart?> publishedById,
        IPublishedApplicationPartByPartIdDataloader publishedApplicationPartById,
        IApplicationService applicationService,
        IEnvironmentService environmentService,
        IComponentDataLoader componentDataLoader,
        IUserSessionAccessor sessionAccessor,
        IPublishingStore publishingStore,
        IEncryptor encryptor,
        IVariableService variableService,
        IVaultClient vaultClient,
        IComponentService componentService)
    {
        _publishedById = publishedById;
        _publishedApplicationPartById = publishedApplicationPartById;
        _applicationService = applicationService;
        _environmentService = environmentService;
        _componentDataLoader = componentDataLoader;
        _sessionAccessor = sessionAccessor;
        _publishingStore = publishingStore;
        _variableService = variableService;
        _componentService = componentService;
        _vaultClient = vaultClient;
        _encryptor = encryptor;
    }

    public async Task<PublishedApplicationPart> PublishPartByIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        Application? application =
            await _applicationService.GetByPartIdAsync(partId, cancellationToken);

        ApplicationPart? applicationPart = application?.Parts.FirstOrDefault(x => x.Id == partId);

        if (application is null || applicationPart is null)
        {
            throw ThrowHelper.PublishingFailedBecauseApplicationPartWasNotFound(partId);
        }

        string configuration =
            await BuildConfigurationForPartAsync(application, applicationPart, cancellationToken);

        UserInfo userInfo = _sessionAccessor.GetUserInfo();

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
        => await _publishedApplicationPartById.LoadAsync(partId, cancellationToken)
            ?? Array.Empty<PublishedApplicationPart>();

    public async Task<IReadOnlyList<Environment>> GetDeployedEnvironmentByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken)
    {
        IEnumerable<Guid> environmentIds = await _publishingStore
            .GetDeployedEnvironmentsByPartIdAsync(partId, cancellationToken);

        return await _environmentService.GetByIdsAsync(environmentIds, cancellationToken);
    }

    public async Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionByPublishedPartIdAsync(
        Guid publishedApplicationId,
        CancellationToken cancellationToken)
        => await _publishingStore
            .GetClaimedVersionByPublishingIdAsync(publishedApplicationId, cancellationToken);

    public async Task<PublishedApplicationPart?> GetPublishedById(
        Guid id,
        CancellationToken cancellationToken)
        => await _publishedById.LoadAsync(id, cancellationToken);

    public async Task<ClaimedVersion> ClaimVersionAsync(
        string gitVersion,
        string applicationName,
        string applicationPartName,
        string environmentName,
        CancellationToken cancellationToken)
    {
        Environment? env =
            await _environmentService.GetByNameAsync(environmentName, cancellationToken);

        if (env is null)
        {
            throw ThrowHelper.ClaimFailedBecauseEnvWasNotFound(
                applicationName,
                applicationPartName,
                environmentName);
        }

        Application? app = await _applicationService
            .FindByApplicationNameAsync(applicationName, cancellationToken);

        if (app is null)
        {
            throw ThrowHelper.ClaimFailedBecauseApplicationWasNotFound(
                applicationName,
                applicationPartName);
        }

        ApplicationPart? part = app.Parts.FirstOrDefault(x => x.Name == applicationPartName);

        if (part is null)
        {
            throw ThrowHelper.ClaimFailedBecauseApplicationPartWasNotFound(
                applicationName,
                applicationPartName);
        }

        ClaimedVersion? claimedVersion = await _publishingStore
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

        ClaimedVersion? version = await _publishingStore
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
        IEnumerable<Variable> variables =
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

    public Task<IReadOnlyList<ClaimedVersion>> GetClaimedVersionAsync(
        Guid partId,
        Guid environmentId,
        CancellationToken cancellationToken)
        => _publishingStore.GetClaimedVersionAsync(partId, environmentId, cancellationToken);

    public override bool Equals(object? obj)
    {
        return base.Equals(obj);
    }

    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

    public override string? ToString()
    {
        return base.ToString();
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
