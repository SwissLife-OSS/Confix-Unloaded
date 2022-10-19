namespace Confix.Authoring;

public sealed class EnvironmentNameCollisionException : Exception
{
    public EnvironmentNameCollisionException(string name)
    {
        Name = name;
    }

    public string Name { get; }
}
