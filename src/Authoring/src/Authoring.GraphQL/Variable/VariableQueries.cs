using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class VariableQueries
    {
        private readonly IVariableService _variableService;

        public VariableQueries(IVariableService variableService)
        {
            _variableService = variableService;
        }

        public async Task<IEnumerable<Variable>> GetVariablesAsync(
            CancellationToken cancellationToken)
        {
            return await _variableService.GetAllAsync(cancellationToken);
        }

        public async Task<Variable> GetVariableAsync(
            [ID(nameof(Variable))] Guid id,
            CancellationToken cancellationToken)
        {
            return await _variableService.GetByIdAsync(id,cancellationToken);
        }
    }
}
