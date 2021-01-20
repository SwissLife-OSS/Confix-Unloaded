using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class VariableResolvers
    {
        private readonly IVariableService _variableService;

        public VariableResolvers(IVariableService variableService)
        {
            _variableService = variableService;
        }

        public async Task<Variable> GetVariableAsync(
            VariableValue value,
            VariableByIdDataLoader variableById,
            CancellationToken cancellationToken)
        {
            return await variableById.LoadAsync(
                value.Id, // TODO Question, which id/key shall be used, id or VariableId or Key (Compound)
                cancellationToken);
        }

        public async Task<Application?> GetApplicationAsync(
            VariableValue value,
            ApplicationByIdDataLoader applicationById,
            CancellationToken cancellationToken)
        {
            if (value.Key.ApplicationId.HasValue)
            {
                return await applicationById.LoadAsync(
                    value.Key.ApplicationId.Value,
                    cancellationToken);

            }

            return null;
        }

        public async Task<ApplicationPart?> GetApplicationPartAsync(
            VariableValue value,
            ApplicationPartByIdDataLoader applicationPartById,
            CancellationToken cancellationToken)
        {
            if (value.Key.ApplicationId.HasValue)
            {
                return await applicationPartById.LoadAsync(
                    value.Key.ApplicationId.Value,
                    cancellationToken);
            }

            return null;
        }

        public Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
            Variable variable,
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
