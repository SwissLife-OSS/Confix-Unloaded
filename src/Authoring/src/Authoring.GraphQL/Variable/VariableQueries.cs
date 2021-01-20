using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Query")]
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
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _variableService.GetByIdAsync(id,cancellationToken);
        }
    }
}
