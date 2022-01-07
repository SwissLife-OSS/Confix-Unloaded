using System;
using System.Collections.Generic;

namespace Confix.Authoring
{
    public sealed class SchemaViolationException : Exception
    {
        public SchemaViolationException(IReadOnlyList<SchemaViolation> violations)
            : base("Values has invalid structure.")
        {
            Violations = violations;
        }

        public IReadOnlyList<SchemaViolation> Violations { get; }
    }
}
