namespace Confix.Authoring.GraphQL.Applications;

public sealed class EnvironmentNameCollisionError : UserError
{
    public EnvironmentNameCollisionError(string name)
        : base($"There is already a environment with name `{name}`")
    {
        Name = name;
    }

    public EnvironmentNameCollisionError(EnvironmentNameCollisionException exception)
        : this(exception.Name)
    {
    }

    public string Name { get; }
}