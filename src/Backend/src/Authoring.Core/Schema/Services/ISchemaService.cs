using HotChocolate;

namespace Confix.Authoring.Internal;

//TODO this is not a "Service" like the other services. Find a better name
public interface ISchemaService
{
    string CreateValuesForSchema(string schemaSdl, IDictionary<string, object?> values);

    string CreateValuesForSchema(ISchema schema, IDictionary<string, object?> values);

    ISchema CreateSchema(string schema);
}
