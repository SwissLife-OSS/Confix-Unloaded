using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public class UpdateVariablePayload : Payload
    {
        public Variable? Variable { get; }

        public UpdateVariablePayload(Variable variable)
        {
            Variable = variable;
        }
    }
}
