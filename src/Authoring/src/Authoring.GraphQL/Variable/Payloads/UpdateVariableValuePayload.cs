using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public class UpdateVariableValuePayload
    {
        public VariableValue? Value { get; }

        public UpdateVariableValuePayload(VariableValue value)
        {
            Value = value;
        }
    }
}
