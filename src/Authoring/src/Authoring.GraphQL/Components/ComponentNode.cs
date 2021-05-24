using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using HotChocolate;
using HotChocolate.Language;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    [Node]
    [ExtendObjectType(typeof(Component))]
    public class ComponentNode
    {
        [NodeResolver]
        public static async Task<Component?> GetComponentAsync(
            Guid id,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken) =>
            await componentById.LoadAsync(id, cancellationToken);

        [GraphQLType(typeof(AnyType))]
        public List<object> GetSchemaAsJson([Parent] Component component)
        {
            DocumentNode document = Utf8GraphQLParser.Parse(component.Schema!);
            Dictionary<string, TypeKind> typeKinds = CreateTypeKindLookup(document);
            List<object> types = new();

            foreach (var definition in document.Definitions)
            {
                if (definition is ObjectTypeDefinitionNode objectType)
                {
                    var fields = new List<object>();

                    types.Add(
                        new Dictionary<string, object?>
                        {
                            {"name", objectType.Name.Value},
                            {"kind", TypeKind.Object},
                            {"fields", fields}
                        });

                    foreach (var field in objectType.Fields)
                    {
                        fields.Add(CreateFieldDto(field, typeKinds));
                    }
                }
                else if (definition is EnumTypeDefinitionNode enumType)
                {
                    types.Add(
                        new Dictionary<string, object?>
                        {
                            {"name", enumType.Name.Value},
                            {"kind", TypeKind.Enum},
                            {"enumValues", enumType.Values.Select(t => t.Name.Value).ToList()}
                        });
                }
            }

            return types;
        }

        [GraphQLType(typeof(AnyType))]
        public async Task<Dictionary<string, object?>?> GetValuesAsJson(
            [Parent] Component component,
            [Service] IComponentService componentService,
            CancellationToken cancellationToken)
        {
            if (component.Values is null)
            {
                return null;
            }

            ISchema? schema = await componentService.GetSchemaByIdAsync(component.Id, cancellationToken);

            if (schema is null)
            {
                return null;
            }

            var document = JsonDocument.Parse(component.Values!);
            return DeserializeDictionary(document.RootElement, schema.QueryType);
        }

        private object? Deserialize(JsonElement element, IType type)
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

        private Dictionary<string, object?> DeserializeDictionary(JsonElement element, IType type)
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

        private List<object?> DeserializeList(JsonElement array, IType type)
        {
            var list = new List<object?>();
            IType elementType = type.ElementType();

            foreach (JsonElement element in array.EnumerateArray())
            {
                list.Add(Deserialize(element, elementType));
            }

            return list;
        }

        private Dictionary<string, object?> CreateFieldDto(
            FieldDefinitionNode field,
            Dictionary<string, TypeKind> typeKinds)
        {
            // TODO : add validator
            return new()
            {
                {"name", field.Name.Value}, {"type", CreateTypeDto(field.Type, typeKinds)}
            };
        }

        private Dictionary<string, object?> CreateTypeDto(
            ITypeNode type,
            Dictionary<string, TypeKind> typeKinds)
        {
            return type switch
            {
                NonNullTypeNode nnt => new Dictionary<string, object?>
                {
                    {"kind", TypeKind.NonNull}, {"ofType", CreateTypeDto(nnt.Type, typeKinds)},
                },
                ListTypeNode lt => new Dictionary<string, object?>
                {
                    {"kind", TypeKind.List}, {"ofType", CreateTypeDto(lt.Type, typeKinds)},
                },
                NamedTypeNode nt => new Dictionary<string, object?>
                {
                    {"kind", typeKinds[nt.Name.Value]}, {"name", nt.Name.Value},
                },
                _ => throw new InvalidOperationException("Invalid Type Structure.")
            };
        }

        private Dictionary<string, TypeKind> CreateTypeKindLookup(DocumentNode document)
        {
            Dictionary<string, TypeKind> typeKinds = new()
            {
                {ScalarNames.String, TypeKind.Scalar},
                {ScalarNames.Int, TypeKind.Scalar},
                {ScalarNames.Boolean, TypeKind.Scalar},
                {ScalarNames.Float, TypeKind.Scalar}
            };

            foreach (var definition in document.Definitions)
            {
                if (definition is ObjectTypeDefinitionNode objectType)
                {
                    typeKinds[objectType.Name.Value] = TypeKind.Object;
                }
                else if (definition is EnumTypeDefinitionNode enumType)
                {
                    typeKinds[enumType.Name.Value] = TypeKind.Enum;
                }
            }

            return typeKinds;
        }
    }
}
