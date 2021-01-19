using System.Collections.Generic;
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
        public async Task<UpdateVariablePayload> SaveValueAsync(
            SaveVariableValueRequest input,
            CancellationToken cancellationToken)
        {
            Variable variable = await _variableService.SaveVariableValueAsync(
                input,
                cancellationToken);

            return new UpdateVariablePayload(variable);
        }
    }

    public class UpdateVariablePayload : Payload
    {
        public Variable? Variable { get; }

        public UpdateVariablePayload(Variable variable)
        {
            Variable = variable;
        }

        public UpdateVariablePayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }
}
