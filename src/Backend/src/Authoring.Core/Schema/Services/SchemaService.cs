using System.Collections.Concurrent;
using System.Text.Json;
using HotChocolate;
using HotChocolate.Language;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring.Internal;

internal sealed class SchemaService : ISchemaService
{
    // TODO: Memory cache?
    private readonly ConcurrentDictionary<string, ISchema> _schemas = new();

    public string CreateValuesForSchema(string schemaSdl, IDictionary<string, object?> values)
    {
        var schema = CreateSchema(schemaSdl);

        return CreateValuesForSchema(schema, values);
    }

    public string CreateValuesForSchema(ISchema schema, IDictionary<string, object?> values)
    {
        var violations = ValidateDictionary(schema, values, schema.QueryType);

        if (violations.Count > 0)
        {
            throw new SchemaViolationException(violations);
        }

        return JsonSerializer.Serialize(values);
    }

    public ISchema CreateSchema(string schema)
    {
        var schemaDoc = Utf8GraphQLParser.Parse(schema);
        var rootTypeName = schemaDoc.Definitions
                .OfType<ObjectTypeDefinitionNode>()
                .FirstOrDefault()?.Name.Value ?? "Component";

        return _schemas.GetOrAdd(schema,
            s =>
                SchemaBuilder.New()
                    .AddDocument(schemaDoc)
                    .Use(next => next)
                    .ModifyOptions(c =>
                    {
                        c.QueryTypeName = rootTypeName;
                        c.StrictValidation = false;
                    })
                    .Create());
    }
}
