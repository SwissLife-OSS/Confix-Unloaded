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

        public UpdateVariableValuePayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }
}
