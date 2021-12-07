namespace Confix.Authoring.GraphQL;

public class RenameVariablePayload
{
    public Variable? Variable { get; }

    public RenameVariablePayload(Variable variable)
    {
        Variable = variable;
    }
}
