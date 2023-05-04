using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public abstract record VariableValueScope
{
    protected VariableValueScope(Guid? environmentId)
    {
        this.EnvironmentId = environmentId;
    }

    [ID<Environment>]
    public Guid? EnvironmentId { get; set; }
}
