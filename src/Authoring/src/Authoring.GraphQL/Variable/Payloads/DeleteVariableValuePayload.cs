using System;
using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public class DeleteVariableValuePayload : Payload
    {
        public Guid? DeletedId { get; }
        public Variable? Variable { get; }

        public DeleteVariableValuePayload(Guid deletedId, Variable variable)
        {
            DeletedId = deletedId;
            Variable = variable;
        }

        public DeleteVariableValuePayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }
}
