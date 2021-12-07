namespace Confix.Authoring.GraphQL;

public class RenameEnvironmentPayload
{
    public Environment? Environment { get; }

    public RenameEnvironmentPayload(Environment? environment)
    {
        Environment = environment;
    }
}
