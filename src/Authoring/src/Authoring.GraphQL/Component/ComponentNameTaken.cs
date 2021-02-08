using System;

namespace Confix.Authoring.GraphQL
{
    public class ComponentNameTaken : UserError
    {
        public ComponentNameTaken(string componentName)
            : base("The component name is already used by a different component.")
        {
            ComponentName = componentName;
        }

        public string ComponentName { get; }

        public static ComponentNameTaken? CreateErrorFrom(Exception exception)
        {
            throw new Exception();
        }
    }
}
