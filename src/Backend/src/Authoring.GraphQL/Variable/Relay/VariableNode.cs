namespace Confix.Authoring.GraphQL;

[Node]
[ExtendObjectType(typeof(Variable))]
public sealed class VariableNode
{
    [NodeResolver]
    public static Task<Variable?> GetVariableAsync(
        [Service] IVariableService service,
        Guid id,
        CancellationToken cancellationToken)
    {
        return service.GetByIdAsync(id, cancellationToken);
    }
}
