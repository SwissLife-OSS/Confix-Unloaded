using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public abstract record VariableValueScope([property: ID<Environment>] Guid? EnvironmentId)
{
    public abstract string Identifier { get; }
}
