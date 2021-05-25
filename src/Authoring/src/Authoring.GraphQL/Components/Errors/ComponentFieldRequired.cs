using Confix.Authoring.GraphQL.Applications;

namespace Confix.Authoring.GraphQL.Components
{
    public class ComponentFieldRequired : UserError
    {
        public ComponentFieldRequired(FieldRequiredException exception) 
            : base(exception.Message)
        {
            Type = exception.Type;
            Field = exception.Field;
        }

        public string Type { get; }

        public string Field { get; }
    }
}
