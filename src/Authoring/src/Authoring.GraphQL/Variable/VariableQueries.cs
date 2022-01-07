using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.AspNetCore.Identity;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public class VariableQueries
{
    public async Task<IEnumerable<Variable>> GetVariablesAsync(
        [Service] IVariableService variableService,
        CancellationToken cancellationToken)
        => await variableService.GetAllAsync(cancellationToken);

    [UsePaging]
    public IQueryable<Variable> SearchVariables(
        [Service] IVariableService variableService,
        string? search)
        => variableService.SearchVariables(search);

    public async Task<Variable> GetVariableAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid id,
        CancellationToken cancellationToken)
        => await variableService.GetByIdAsync(id, cancellationToken);

    public async Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
        [Service] IVariableService variableService,
        [ID(nameof(Variable))] Guid variableId,
        [ID(nameof(Application))] Optional<Guid?> applicationId,
        [ID(nameof(ApplicationPart))] Optional<Guid?> applicationPartId,
        CancellationToken cancellationToken)
    {
        VariableValueFilter filter = new(variableId)
        {
            ApplicationId = applicationId,
            PartId = applicationPartId
        };
        return await variableService.GetValuesAsync(filter, false, cancellationToken);
    }

    public async Task<IEnumerable<VariableValue>> GetGlobalVariableValuesAsync(
        [Service] IVariableService service,
        CancellationToken cancellationToken)
        => await service.GetGlobalValues(cancellationToken);
}
