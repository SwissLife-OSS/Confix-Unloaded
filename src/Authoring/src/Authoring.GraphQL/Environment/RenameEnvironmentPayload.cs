namespace Confix.Authoring.GraphQL;

public class UpdateEnvironmentNamePayload
{
    public Environment? Environment { get; }

    public UpdateEnvironmentNamePayload(Environment environment)
    {
        Environment = environment;
    }
}
