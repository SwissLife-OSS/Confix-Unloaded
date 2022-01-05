using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Variable))]
public class VariableExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Variable application,
        CancellationToken cancellationToken)
    {
        return await service.GetByVariableId(application.Id, cancellationToken);
    }
}
