using System.Collections.Generic;
using Confix.Authoring.GraphQL.Applications;

namespace Confix.Authoring.GraphQL.Components;

public class ValueSchemaViolation : UserError
{
    public ValueSchemaViolation(SchemaViolationException exception)
        : base(exception.Message)
    {
        Violations = exception.Violations;
    }

    public IReadOnlyList<SchemaViolation> Violations { get; }
}
