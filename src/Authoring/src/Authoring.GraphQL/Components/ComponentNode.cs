using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using HotChocolate;
using HotChocolate.Language;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using TypeKind = HotChocolate.Utilities.Introspection.TypeKind;

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
                            { "name", objectType.Name.Value },
                            { "kind", TypeKind.OBJECT },
                            { "fields", fields }
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
                            { "name", enumType.Name.Value },
                            { "kind", TypeKind.ENUM },
                            { "enumValues", enumType.Values.Select(t => t.Name.Value).ToList() }
                        });
                }
            }

            return types;
        }

        private Dictionary<string, object?> CreateFieldDto(
            FieldDefinitionNode field,
            Dictionary<string, TypeKind> typeKinds)
        {
            // TODO : add validator
            return new()
            {
                { "name", field.Name.Value },
                { "type", CreateTypeDto(field.Type, typeKinds) }
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
                    { "kind", TypeKind.NON_NULL },
                    { "ofType", CreateTypeDto(nnt.Type, typeKinds) },
                },
                ListTypeNode lt => new Dictionary<string, object?>
                {
                    { "kind", TypeKind.LIST }, { "ofType", CreateTypeDto(lt.Type, typeKinds) },
                },
                NamedTypeNode nt => new Dictionary<string, object?>
                {
                    { "kind", typeKinds[nt.Name.Value] }, { "name", nt.Name.Value },
                },
                _ => throw new InvalidOperationException("Invalid Type Structure.")
            };
        }

        private Dictionary<string, TypeKind> CreateTypeKindLookup(DocumentNode document)
        {
            Dictionary<string, TypeKind> typeKinds = new()
            {
                { ScalarNames.String, TypeKind.SCALAR },
                { ScalarNames.Int, TypeKind.SCALAR },
                { ScalarNames.Boolean, TypeKind.SCALAR },
                { ScalarNames.Float, TypeKind.SCALAR }
            };

            foreach (var definition in document.Definitions)
            {
                if (definition is ObjectTypeDefinitionNode objectType)
                {
                    typeKinds[objectType.Name.Value] = TypeKind.OBJECT;
                }
                else if (definition is EnumTypeDefinitionNode enumType)
                {
                    typeKinds[enumType.Name.Value] = TypeKind.ENUM;
                }
            }

            return typeKinds;
        }
    }
}
