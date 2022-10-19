using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationPartNode
{
    [NodeResolver]
    public static Task<ApplicationPart?> GetApplicationPartAsync(
        Guid id,
        IApplicationPartDataLoader applicationPartById,
        CancellationToken cancellationToken)
    {
        return applicationPartById.LoadAsync(id, cancellationToken);
    }
}
