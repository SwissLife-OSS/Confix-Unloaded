using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ApplicationPartComponent))]
public class ApplicationPartComponentChangeLogExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] ApplicationPartComponent partComponent,
        CancellationToken cancellationToken)
    {
        return await service.GetByApplicationPartComponentId(partComponent.Id, cancellationToken);
    }
}
