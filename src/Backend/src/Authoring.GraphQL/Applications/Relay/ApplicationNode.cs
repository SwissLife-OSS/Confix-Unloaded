using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(Application))]
public sealed class ApplicationNode
{
    [NodeResolver]
    public static Task<Application?> GetApplicationAsync(
        [Service] IApplicationService service,
        Guid id,
        CancellationToken cancellationToken)
    {
        return service.GetByIdAsync(id, cancellationToken);
    }
}
