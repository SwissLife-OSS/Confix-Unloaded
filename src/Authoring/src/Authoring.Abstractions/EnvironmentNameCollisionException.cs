using System;

namespace Confix.Authoring;

public class EnvironmentNameCollisionException : Exception
{
    public EnvironmentNameCollisionException(string name)
    {
        Name = name;
    }

    public string Name { get; }
}
