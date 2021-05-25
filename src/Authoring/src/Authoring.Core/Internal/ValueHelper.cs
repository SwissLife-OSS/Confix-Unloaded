using System.Collections.Generic;
using System.Text.Json;
using HotChocolate.Types;

namespace Confix.Authoring.Internal
{
    public static class ValueHelper
    {
        public static void ValidateDictionary(Dictionary<string, object?> value, IType type)
        {
            if (!type.IsObjectType())
            {
                throw new ValueStructureInvalidException(type.NamedType().Name, value);
            }

            var objectType = (ObjectType)type.NamedType();

            foreach (var field in objectType.Fields)
            {
                if (value.TryGetValue(field.Name, out var fieldValue))
                {
                    Validate(fieldValue, field.Type);
                }
                else if (field.Type.IsNonNullType())
                {
                    throw new FieldRequiredException(objectType.Name, field.Name);
                }
            }
        }

        private static void Validate(object? value, IType type)
        {
            switch (value)
            {
                case Dictionary<string, object?> dict:
                    ValidateDictionary(dict, type);
                    break;

                case List<object?> list:
                    ValidateList(list, type);
                    break;

                case string:
                    if (!type.IsScalarType() && type.NamedType() is not StringType)
                    {
                        throw new ValueStructureInvalidException(type.NamedType().Name, value);
                    }
                    break;

                case int:
                    if (!type.IsScalarType() && type.NamedType() is not IntType and not FloatType)
                    {
                        throw new ValueStructureInvalidException(type.NamedType().Name, value);
                    }
                    break;

                case bool:
                    if (!type.IsScalarType() && type.NamedType() is not BooleanType)
                    {
                        throw new ValueStructureInvalidException(type.NamedType().Name, value);
                    }
                    break;

                case double:
                    if (!type.IsScalarType() && type.NamedType() is not FloatType)
                    {
                        throw new ValueStructureInvalidException(type.NamedType().Name, value);
                    }
                    break;
            }
        }

        private static void ValidateList(List<object?> value, IType type)
        {
            IType elementType = type.ElementType();
            foreach (var element in value)
            {
                Validate(element, elementType);
            }
        }

        public static Dictionary<string, object?> DeserializeDictionary(JsonElement element, IType type)
        {
            var dictionary = new Dictionary<string, object?>();
            var objectType = (ObjectType)type.NamedType();

            foreach (JsonProperty property in element.EnumerateObject())
            {
                IType fieldType = objectType.Fields[property.Name].Type;
                dictionary[property.Name] = Deserialize(property.Value, fieldType);
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
            IType elementType = type.ElementType();

            foreach (JsonElement element in array.EnumerateArray())
            {
                list.Add(Deserialize(element, elementType));
            }

            return list;
        }
    }
}
