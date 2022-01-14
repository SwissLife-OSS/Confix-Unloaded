using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public class PublishingService : IPublishingService
{
    private readonly IDataLoader<Guid, PublishedApplicationPart?> _publishedById;
    private readonly IPublishedApplicationPartByPartIdDataloader _publishedApplicationPartById;
    private readonly IApplicationService _applicationService;
    private readonly IComponentDataLoader _componentDataLoader;
    private readonly IPublishingStore _publishingStore;
    private readonly IVariableService _variableService;

    public PublishingService(
        IDataLoader<Guid, PublishedApplicationPart?> publishedById,
        IPublishedApplicationPartByPartIdDataloader publishedApplicationPartById,
        IApplicationService applicationService,
        IComponentDataLoader componentDataLoader,
        IPublishingStore publishingStore,
        IVariableService variableService)
    {
        _publishedById = publishedById;
        _publishedApplicationPartById = publishedApplicationPartById;
        _applicationService = applicationService;
        _componentDataLoader = componentDataLoader;
        _publishingStore = publishingStore;
        _variableService = variableService;
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

        PublishedApplicationPart published =
            new(Guid.NewGuid(), applicationPart.Version, applicationPart, configuration);

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

        JsonVariableVisitorContext context = new();
        JsonVariableVisitor.Default.Visit(jsonObject, context);

        var variableNames = context.Variables.Select(x => x.VariableName).ToArray();
        IDictionary<string, VariableValue> resolvesValues = await _variableService
            .GetBestMatchingValuesAsync(variableNames, app.Id, part.Id, cancellationToken);

        foreach (VariableMatch variable in context.Variables)
        {
            if (!resolvesValues.TryGetValue(variable.VariableName, out VariableValue? value))
            {
                throw ThrowHelper
                    .PublishingFailedBecauseVariableValueWasNotPresent(
                        part,
                        component,
                        variable.VariableName);
            }

            variable.SetValue(JsonValue.Create(value.Value)!);
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
