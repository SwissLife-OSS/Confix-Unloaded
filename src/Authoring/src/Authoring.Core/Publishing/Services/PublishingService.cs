using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using GreenDonut;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

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

    public PublishingService(
        IDataLoader<Guid, PublishedApplicationPart?> publishedById,
        IPublishedApplicationPartByPartIdDataloader publishedApplicationPartById,
        IApplicationService applicationService,
        IEnvironmentService environmentService,
        IComponentDataLoader componentDataLoader,
        IUserSessionAccessor sessionAccessor,
        IPublishingStore publishingStore,
        IVariableService variableService,
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

        PublishedApplicationPart published =
            new(Guid.NewGuid(),
                applicationPart.Version,
                applicationPart,
                configuration,
                DateTime.UtcNow,
                userInfo);

        await _publishingStore.CreateAsync(published, cancellationToken);

        return published;
    }

    public async Task<IReadOnlyList<PublishedApplicationPart>> GetPublishedByPartId(
        Guid partId,
        CancellationToken cancellationToken)
        => await _publishedApplicationPartById.LoadAsync(partId, cancellationToken)
            ?? Array.Empty<PublishedApplicationPart>();

    public async Task<PublishedApplicationPart?> GetPublishedById(
        Guid id,
        CancellationToken cancellationToken)
        => await _publishedById.LoadAsync(id, cancellationToken);

    public async Task<ClaimedVersion?> ClaimVersionAsync(
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
            // TODO Exception
            return null;
        }

        Application? app = await _applicationService
            .FindByApplicationNameAsync(applicationName, cancellationToken);

        ApplicationPart? part = app?.Parts.FirstOrDefault(x => x.Name == applicationPartName);

        if (app is null || part is null)
        {
            // TODO Exception
            return null;
        }


        ClaimedVersion? claimedVersion = await _publishingStore
            .GetClaimedVersionByGitVersionAsync(
                gitVersion,
                applicationName,
                applicationPartName,
                cancellationToken);

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
            // TODO Exception
            return null;
        }

        string variableReplaced = await ReplaceVariableValuesAsync(
            app,
            part,
            env,
            publishedApplicationPart.Configuration,
            cancellationToken
        );

        ClaimedVersion version = new ClaimedVersion(
            Guid.NewGuid(),
            gitVersion,
            applicationName,
            applicationPartName,
            environmentName,
            publishedApplicationPart.Id,
            variableReplaced,
            DateTime.UtcNow);

        return await _publishingStore.GetOrCreateClaimedVersionAsync(version, cancellationToken);
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
                    .ClaimFailedBecauseVariableValueWasNotPresent(part, environment.Name, variable.VariableName);
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

public static class JsonNodeSerializer
{
    public static IDictionary<string, object?> DeserializeToDictionary(JsonObject node)
    {
        Dictionary<string, object?> dictionary = new();
        foreach (var elm in node)
        {
            dictionary[elm.Key] = DeserializeToDictionary(elm.Value);
        }

        return dictionary;
    }

    public static object?[] DeserializeToDictionary(JsonArray node)
    {
        var results = new object?[node.Count];
        for (var i = 0; i < node.Count; i++)
        {
            results[i] = DeserializeToDictionary(node[i]);
        }

        return results;
    }


    public static object? DeserializeToDictionary(JsonValue value)
    {
        JsonElement element = value.GetValue<JsonElement>();

        switch (element.ValueKind)
        {
            case JsonValueKind.String:
                return element.GetString();

            case JsonValueKind.Number:
                return element.GetDouble();

            case JsonValueKind.True:
                return true;

            case JsonValueKind.False:
                return false;
        }

        return null;
    }

    public static object? DeserializeToDictionary(JsonNode? node) =>
        node switch
        {
            JsonObject a => DeserializeToDictionary(a),
            JsonArray a => DeserializeToDictionary(a),
            JsonValue a => DeserializeToDictionary(a),
            _ => null,
        };
}
