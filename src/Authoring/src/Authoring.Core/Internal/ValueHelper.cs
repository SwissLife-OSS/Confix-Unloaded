using System;
using System.Collections.Generic;
using System.Text.Json;
using HotChocolate.Types;

namespace Confix.Authoring.Internal
{
    public static class ValueHelper
    {
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
