using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public class UpdateVariableValuePayload : Payload
    {
        public VariableValue? Value { get; }

        public UpdateVariableValuePayload(VariableValue value)
        {
            Value = value;
        }
    }
}
