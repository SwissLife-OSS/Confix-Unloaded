using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using HotChocolate;
using HotChocolate.Language;
using Microsoft.Extensions.Caching.Memory;
using static Confix.Authoring.Internal.ValueHelper;

namespace Confix.Authoring.Internal;

internal sealed class SchemaValidator : ISchemaValidator
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _cacheExpiration = TimeSpan.FromHours(1);
    public SchemaValidator(IMemoryCache cache)
    {
        _cache = cache;
    }

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

    private ISchema CreateSchema(string schemaSdl)
        => _cache.GetOrCreate(CacheKey(schemaSdl), (e) =>
        {
            e.AbsoluteExpirationRelativeToNow = _cacheExpiration;

            return SchemaBuilder.New()
                .AddDocument(Utf8GraphQLParser.Parse(schemaSdl))
                .Use(x => x)
                .ModifyOptions(c =>
                {
                    c.QueryTypeName = "Configuration";
                    c.StrictValidation = false;
                })
                .Create();
        })!;

    private static string CacheKey(string input)
        => Encoding.UTF8.GetString(SHA256.HashData(Encoding.UTF8.GetBytes(input)));
}
