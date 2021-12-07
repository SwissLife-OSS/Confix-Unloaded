using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public class QueryVariablesExtensions
{
    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValuesAsync(
        [Service] IVariableService service,
        CancellationToken cancellationToken)
    {
        return await service.GetGlobalValues(cancellationToken);
    }
}
