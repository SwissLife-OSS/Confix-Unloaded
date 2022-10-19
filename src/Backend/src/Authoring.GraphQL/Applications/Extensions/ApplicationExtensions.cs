using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Application))]
public sealed class ApplicationExtensions
{
    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService service,
        [Parent] Application application,
        CancellationToken cancellationToken)
    {
        return await service.GetValuesByApplicationAsync(application.Id, cancellationToken);
    }

    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Application application,
        CancellationToken cancellationToken)
    {
        return await service.GetByApplicationId(application.Id, cancellationToken);
    }
}
