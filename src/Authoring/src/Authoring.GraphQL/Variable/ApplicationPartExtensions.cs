using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(ApplicationPart))]
public class ApplicationPartVariablesExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] ApplicationPart applicationPart,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesByApplicationPartAsync(applicationPart.Id, cancellationToken);
    }
}
