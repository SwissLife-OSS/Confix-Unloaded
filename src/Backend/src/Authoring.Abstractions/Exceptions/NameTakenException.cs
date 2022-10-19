namespace Confix.Authoring;

public sealed class NameTakenException : Exception
{
    public NameTakenException(string name)
    {
        Name = name;
    }

    public string Name { get; }
}
