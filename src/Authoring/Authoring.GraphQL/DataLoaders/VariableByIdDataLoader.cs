using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GreenDonut;
using HotChocolate.DataLoader;

namespace Confix.Authoring.GraphQL.DataLoaders
{
    public class VariableByIdDataLoader : BatchDataLoader<Guid, Variable>
    {
        private readonly IVariableService _variableService;

        public VariableByIdDataLoader(
            IVariableService variableService,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _variableService = variableService;
        }

        protected override async Task<IReadOnlyDictionary<Guid, Variable>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            IEnumerable<Variable> variables = await _variableService.GetManyAsync(
                keys,
                cancellationToken);

            return variables.ToDictionary(x => x.Id);
        }
    }
}
