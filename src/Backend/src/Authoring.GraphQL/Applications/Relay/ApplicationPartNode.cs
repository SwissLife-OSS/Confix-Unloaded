using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationPartNode
{
    [NodeResolver]
    public static Task<ApplicationPart?> GetApplicationPartAsync(
        [Service] IApplicationService service,
        Guid id,
        CancellationToken cancellationToken)
    {
        return service.GetPartByIdAsync(id, cancellationToken);
    }
}
