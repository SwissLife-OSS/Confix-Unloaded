using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate;

namespace Confix.Authoring.GraphQL
{
    public class VariableResolvers
    {
        private readonly IVariableService _variableService;

        public VariableResolvers(IVariableService variableService)
        {
            _variableService = variableService;
        }


        public Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
            [Parent] Variable variable,
            CancellationToken cancellationToken)
        {
            return _variableService.GetValuesAsync(
                variable,
                new GetVariableValuesRequest(
                    new VariableValueFilter(variable.Id)),
                cancellationToken);
        }
    }
}
