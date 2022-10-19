using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Variable))]
public sealed class VariableExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Variable application,
        CancellationToken cancellationToken)
        => await service.GetByVariableId(application.Id, cancellationToken);

    public async Task<IEnumerable<VariableValue>> GetValuesAsync(
        [Service] IVariableService service,
        [Parent] Variable variable,
        CancellationToken cancellationToken)
        => await service.GetValuesAsync(
            variable,
            new VariableValueFilter(variable.Id),
            false,
            cancellationToken);
}
