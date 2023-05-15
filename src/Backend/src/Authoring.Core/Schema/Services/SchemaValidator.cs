using System.Text.Json;
using HotChocolate;
using HotChocolate.Language;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring.Internal;

internal sealed class SchemaValidator : ISchemaValidator
{
    public void ValidateSchema(string schemaSdl)
    {
        try
        {
            CreateSchema(schemaSdl);
        }
        catch (SchemaException ex)
        {
            throw new InvalidSchemaException(ex.Errors.Select(e => e.Message).ToArray());
        }
        catch (Exception ex)
        {
            throw new InvalidSchemaException(new[] { ex.Message });
        }
    }

    public void ValidateValues(JsonElement values, string schemaSdl)
    {
        var violations = GetSchemaViolations(values, schemaSdl);

        if (violations.Count > 0)
        {
            throw new SchemaViolationException(violations);
        }
    }

    public IReadOnlyList<SchemaViolation> GetSchemaViolations(JsonElement values, string schemaSdl)
    {
        ISchema schema = CreateSchema(schemaSdl);
        Dictionary<string, object?> valueDictionary = DeserializeDictionary(values, schema.QueryType);
        return ValidateDictionary(schema, valueDictionary, schema.QueryType);
    }

    // TODO: cache?
    private ISchema CreateSchema(string schemaSdl)
        => SchemaBuilder.New()
                .AddDocument(Utf8GraphQLParser.Parse(schemaSdl))
                .Use(x => x)
                .ModifyOptions(c =>
                {
                    c.QueryTypeName = "Configuration";
                    c.StrictValidation = false;
                })
                .Create();
}
