using System.Text.Json;
using HotChocolate;
using HotChocolate.Types;
using Path = HotChocolate.Path;

namespace Confix.Authoring.Internal;

internal static class ValueHelper
{
    public static Dictionary<string, object?> CreateDefaultObjectValue(ISchema schema, IType type)
    {
        var obj = new Dictionary<string, object?>();
        var objectType = (ObjectType)type.NamedType();

        foreach (var field in objectType.Fields)
        {
            if (field.IsIntrospectionField)
            {
                continue;
            }

            obj[field.Name] = CreateDefaultValue(schema, field.Type);
        }

        return obj;
    }

    private static object? CreateDefaultValue(ISchema schema, IType type)
    {
        if (type.IsNonNullType())
        {
            if (type.IsListType())
            {
                return CreateDefaultListValue(schema, type);
            }

            if (type.IsObjectType())
            {
                return CreateDefaultObjectValue(schema, type);
            }

            if (type.IsEnumType() && type.NamedType() is EnumType enumType)
            {
                return enumType.Values.First().Name.ToString();
            }

            if (type.IsAbstractType())
            {
                return CreateDefaultObjectValue(
                    schema,
                    schema.GetPossibleTypes(type.NamedType())[0]);
            }

            // TODO: Repalce
            switch (type.NamedType().Name)
            {
                case "String":
                    return "abc";
                case "Int":
                    return 123;
                case "Float":
                    return 123.123;
                case "Boolean":
                    return true;
                default:
                    throw new NotSupportedException();
            }
        }

        return null;
    }

    private static List<object?> CreateDefaultListValue(ISchema schema, IType type)
    {
        return new List<object?> { CreateDefaultValue(schema, type.ElementType()) };
    }

    public static List<SchemaViolation> ValidateDictionary(
        ISchema schema,
        IDictionary<string, object?> value,
        IType type)
    {
        List<SchemaViolation> schemaViolations = new();
        ValidateDictionary(schema, value, type, Path.Root, schemaViolations);

        return schemaViolations;
    }

    private static void ValidateDictionary(
        ISchema schema,
        IDictionary<string, object?> value,
        IType type,
        Path path,
        List<SchemaViolation> schemaViolations)
    {
        if (type.IsAbstractType())
        {
            ValidateAbstractType(schema, value, type, path, schemaViolations);

            return;
        }

        if (!type.IsObjectType())
        {
            schemaViolations.Add(new SchemaViolation(path.ToList(), "NOT_AN_OBJECT"));
        }

        var objectType = (ObjectType)type.NamedType();

        foreach (var field in objectType.Fields)
        {
            if (field.IsIntrospectionField)
            {
                continue;
            }

            if (value.TryGetValue(field.Name, out var fieldValue))
            {
                Validate(schema, fieldValue, field.Type, path.Append(field.Name), schemaViolations);
            }
            else if (field.Type.IsNonNullType())
            {
                schemaViolations.Add(
                    new SchemaViolation(path.Append(field.Name).ToList(), "NON_NULL"));
            }
        }

        foreach (var fieldName in value.Keys)
        {
            if (!objectType.Fields.ContainsField(fieldName))
            {
                schemaViolations.Add(
                    new SchemaViolation(path.Append(fieldName).ToList(), "UNKNOWN_FIELD"));
            }
        }
    }

    private static void ValidateAbstractType(
        ISchema schema,
        IDictionary<string, object?> value,
        IType type,
        Path path,
        List<SchemaViolation> schemaViolations)
    {
        var possibleTypes = schema.GetPossibleTypes(type.NamedType());
        List<SchemaViolation> nestedViolations = new();

        foreach (var possibleType in possibleTypes)
        {
            nestedViolations.Clear();
            ValidateDictionary(schema, value, possibleType, path, nestedViolations);

            if (nestedViolations.Count == 0)
            {
                return;
            }
        }

        schemaViolations.Add(new SchemaViolation(path.ToList(), "NO_MATCHING_TYPE_FOUND"));
    }

    private static void Validate(
        ISchema schema,
        object? value,
        IType type,
        Path path,
        List<SchemaViolation> schemaViolations)
    {
        switch (value)
        {
            case Dictionary<string, object?> dict:
                ValidateDictionary(schema, dict, type, path, schemaViolations);

                break;

            case List<object?> list:
                ValidateList(schema, list, type, path, schemaViolations);

                break;

            case string when type.IsScalarType():
                if (type.NamedType() is not StringType)
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;
            case string when type.NamedType() is EnumType enumType && value is string strValue:
                if (!enumType.TryGetValue(strValue, out _))
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;
            case string:
                schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));

                break;

            case int:
                if (!type.IsScalarType() || type.NamedType() is not IntType and not FloatType)
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;

            case bool:
                if (!type.IsScalarType() || type.NamedType() is not BooleanType)
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;

            case double:
                if (!type.IsScalarType() || type.NamedType() is not FloatType)
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;

            case null:
                if (!type.IsNullableType())
                {
                    schemaViolations.Add(new SchemaViolation(path.ToList(), "INVALID_TYPE"));
                }

                break;

            default:
                schemaViolations.Add(new SchemaViolation(path.ToList(), "UNKNOWN_TYPE"));

                break;
        }
    }

    private static void ValidateList(
        ISchema schema,
        List<object?> value,
        IType type,
        Path path,
        List<SchemaViolation> schemaViolations)
    {
        var elementType = type.ElementType();
        var i = 0;

        foreach (var element in value)
        {
            Validate(schema, element, elementType, path.Append(i++), schemaViolations);
        }
    }

    public static Dictionary<string, object?> DeserializeDictionary(JsonElement element, IType type)
    {
        var dictionary = new Dictionary<string, object?>();
        var objectType = (ObjectType)type.NamedType();

        foreach (var property in element.EnumerateObject())
        {
            if (objectType.Fields.TryGetField(property.Name, out var field))
            {
                IType fieldType = objectType.Fields[property.Name].Type;
                dictionary[property.Name] = Deserialize(property.Value, fieldType);
            }
        }

        return dictionary;
    }

    private static object? Deserialize(JsonElement element, IType type)
    {
        switch (element.ValueKind)
        {
            case JsonValueKind.Object:
                return DeserializeDictionary(element, type);

            case JsonValueKind.Array:
                return DeserializeList(element, type);

            case JsonValueKind.String:
                return element.GetString();

            case JsonValueKind.Number:
                if (type.IsScalarType() && type.NamedType().Name.Equals(ScalarNames.Int))
                {
                    return element.GetInt32();
                }

                return element.GetDouble();

            case JsonValueKind.True:
                return true;

            case JsonValueKind.False:
                return false;

            default:
                return null;
        }
    }

    private static List<object?> DeserializeList(JsonElement array, IType type)
    {
        var list = new List<object?>();
        var elementType = type.ElementType();

        foreach (var element in array.EnumerateArray())
        {
            list.Add(Deserialize(element, elementType));
        }

        return list;
    }
}
