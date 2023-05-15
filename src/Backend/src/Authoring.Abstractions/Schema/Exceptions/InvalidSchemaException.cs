namespace Confix.Authoring;

public sealed class InvalidSchemaException: Exception{

    public InvalidSchemaException(string[] errors) : base("The Provided sdl is not valid")
    {
        Errors = errors;
    }

    public string[] Errors;
}
