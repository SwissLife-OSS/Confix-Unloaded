namespace Confix.Authoring;

public sealed class InvalidSchemaException: Exception{
    public InvalidSchemaException(GraphQLSchemaError[] errors) : base("The Provided sdl is not valid")
    {
        Errors = errors;
    }

    public GraphQLSchemaError[] Errors;
}
public record GraphQLSchemaError(string Message);
