using System.Text.Json;

namespace Confix.Authoring.Internal;

public interface ISchemaValidator
{
    void ValidateSchema(string schemaSdl);
    void ValidateValues(JsonElement values, string schemaSdl);
    IReadOnlyList<SchemaViolation> GetSchemaViolations(JsonElement values, string schemaSdl);
}
