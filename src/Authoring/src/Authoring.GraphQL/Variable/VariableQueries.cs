using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.AspNetCore.Identity;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class VariableQueries
    {
        public async Task<IEnumerable<Variable>> GetVariablesAsync(
            [Service] IVariableService variableService,
            CancellationToken cancellationToken)
        {
            return await variableService.GetAllAsync(cancellationToken);
        }

        [UsePaging]
        public IQueryable<Variable> SearchVariables(
            [Service] IVariableService variableService,
            string? search)
        {
            return variableService.SearchVariables(search);
        }

        public async Task<Variable> GetVariableAsync(
            [Service] IVariableService variableService,
            [ID(nameof(Variable))] Guid id,
            CancellationToken cancellationToken)
        {
            return await variableService.GetByIdAsync(id, cancellationToken);
        }
    }
}
