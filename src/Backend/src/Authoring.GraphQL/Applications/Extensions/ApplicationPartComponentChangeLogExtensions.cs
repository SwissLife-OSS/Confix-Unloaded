using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ApplicationPartComponent))]
public sealed class ApplicationPartComponentChangeLogExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] ApplicationPartComponent partComponent,
        CancellationToken cancellationToken)
    {
        return await service.GetByApplicationPartComponentId(partComponent.Id, cancellationToken);
    }
}
