using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Application))]
public class ApplicationVariablesExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] Application application,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesByApplicationAsync(application.Id, cancellationToken);
    }
}
