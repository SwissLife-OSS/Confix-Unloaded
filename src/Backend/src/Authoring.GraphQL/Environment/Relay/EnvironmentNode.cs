namespace Confix.Authoring.GraphQL.Relay;

[Node]
[ExtendObjectType(typeof(Environment))]
public sealed class EnvironmentNode
{
    [NodeResolver]
    public static async Task<Environment?> GetEnvironmentAsync(
        Guid id,
        [Service] IEnvironmentService service,
        CancellationToken cancellationToken) =>
        await service.GetByIdAsync(id, cancellationToken);
}
