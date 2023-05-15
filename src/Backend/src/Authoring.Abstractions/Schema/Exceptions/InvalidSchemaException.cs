namespace Confix.Authoring;

public sealed class InvalidSchemaException: Exception{

    public InvalidSchemaException() : base("The Provided sdl is not valid")
    {
    }

}
