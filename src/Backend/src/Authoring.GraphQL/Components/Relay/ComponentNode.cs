namespace Confix.Authoring.GraphQL.Components;

[Node]
[ExtendObjectType(typeof(Component))]
public sealed class ComponentNode
{
    [NodeResolver]
    public static async Task<Component?> GetComponentAsync(
        Guid id,
        [Service] IComponentService service,
        CancellationToken cancellationToken)
    {
        return await service.GetByIdAsync(id, cancellationToken);
    }
}
