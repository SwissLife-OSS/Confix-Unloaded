using Confix.Authoring.GraphQL.Applications;

namespace Confix.Authoring.GraphQL.Components;

public class SchemaInvalidError : UserError
{
    public SchemaInvalidError(InvalidSchemaException exception): base(exception.Message)
    {
        Errors = exception.Errors;
    }

    public GraphQLSchemaError[] Errors {get;}
}
