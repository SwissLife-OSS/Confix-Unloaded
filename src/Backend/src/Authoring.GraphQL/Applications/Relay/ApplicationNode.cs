using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(Application))]
public sealed class ApplicationNode
{
    [NodeResolver]
    public static Task<Application?> GetApplicationAsync(
        Guid id,
        IApplicationDataLoader applicationById,
        CancellationToken cancellationToken)
    {
        return applicationById.LoadAsync(id, cancellationToken);
    }
}
