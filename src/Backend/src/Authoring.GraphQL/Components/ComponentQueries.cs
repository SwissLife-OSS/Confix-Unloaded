namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ComponentQueries
{
    [UsePaging]
    [UseFiltering(typeof(ComponentFilterInputType))]
    public async Task<IQueryable<Component>> GetComponents(
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        return await componentService.Query(cancellationToken);
    }

    public Task<Component?> GetComponentByIdAsync(
        [ID(nameof(Component))] Guid id,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        return componentService.GetByIdAsync(id, cancellationToken);
    }
}
