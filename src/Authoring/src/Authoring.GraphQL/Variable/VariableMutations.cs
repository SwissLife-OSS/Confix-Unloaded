using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Mutation")]
    public class VariableMutations
    {
        private readonly IVariableService _variableService;

        public VariableMutations(IVariableService variableService)
        {
            _variableService = variableService;
        }

        [GraphQLName("Variable_Add")]
        public async Task<UpdateVariablePayload> AddAsync(
            AddVariableRequest input,
            CancellationToken cancellationToken)
        {
            Variable variable = await _variableService.AddAsync(
                input,
                cancellationToken);

            return new UpdateVariablePayload(variable); 
        }

        [GraphQLName("Variable_SaveValue")]
        public async Task<UpdateVariableValuePayload> SaveValueAsync(
            SaveVariableValueRequest input,
            CancellationToken cancellationToken)
        {
            VariableValue value = await _variableService.SaveVariableValueAsync(
                input,
                cancellationToken);

            return new UpdateVariableValuePayload(value);
        }

        [GraphQLName("Variable_DeleteValue")]
        public async Task<DeleteVariableValuePayload> DeleteValueAsync(
            Guid id, CancellationToken cancellationToken)
        {
            Variable variable = await _variableService.DeleteValueAsync(id, cancellationToken);

            return new DeleteVariableValuePayload(id, variable);
        }
    }
}
