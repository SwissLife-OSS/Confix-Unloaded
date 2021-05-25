using System;

namespace Confix.Authoring
{
    public sealed class FieldRequiredException : Exception
    {
        public FieldRequiredException(string type, string field)
            : base($"Field `{field}` is required.")
        {
            Type = type;
            Field = field;
        }

        public string Type { get; }

        public string Field { get; }
    }
}
