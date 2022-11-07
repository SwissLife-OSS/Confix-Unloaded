namespace Confix.Authoring.GraphQL.Components;

public class SchemaInvalidError : IUserError
{
    public SchemaInvalidError(SchemaException exception)
    {
        Message = string.Join("\n", exception.Errors.Select(x => x.Message));
    }

    public string Code => nameof(SchemaInvalidError);

    public string Message { get; private set; }
}
