using System;

namespace Confix.Authoring
{
    public sealed class ValueStructureInvalidException : Exception
    {
        public ValueStructureInvalidException(string expectedType, object value)
            : base("Value has invalid structure.")
        {
            ExpectedType = expectedType;
            Value = value;
        }

        public string ExpectedType { get; }

        public object Value { get; }
    }
}
