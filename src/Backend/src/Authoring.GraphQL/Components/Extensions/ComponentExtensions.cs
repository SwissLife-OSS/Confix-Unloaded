using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Language;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(Component))]
public sealed class ComponentExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Service] IChangeLogService service,
        [Parent] Component application,
        CancellationToken cancellationToken)
    {
        return await service.GetByComponentId(application.Id, cancellationToken);
    }

    [BindMember(nameof(Component.Schema))]
    [GraphQLType(typeof(SdlType))]
    public string? GetSchemaSdl([Parent] Component component) =>
        component.Schema;

    [GraphQLType(typeof(AnyType))]
    public List<object> GetSchema([Parent] Component component)
    {
        //TODO:  Couldn't we just runn introspection here? What is this even used for

        DocumentNode document = Utf8GraphQLParser.Parse(component.Schema!);

        IDictionary<string, TypeKind> typeKinds = CreateTypeKindLookup(document);
        List<object> types = new();

        foreach (IDefinitionNode? definition in document.Definitions)
        {
            if (definition is ObjectTypeDefinitionNode objectType)
            {
                var fields = new List<object>();

                types.Add(
                    new Dictionary<string, object?>
                    {
                        { "name", objectType.Name.Value },
                        { "kind", TypeKind.Object },
                        { "fields", fields }
                    });

                foreach (FieldDefinitionNode? field in objectType.Fields)
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
                        { "kind", TypeKind.Enum },
                        { "enumValues", enumType.Values.Select(t => t.Name.Value).ToList() }
                    });
            }
            else if (definition is UnionTypeDefinitionNode unionType)
            {
                types.Add(
                    new Dictionary<string, object?>
                    {
                        { "name", unionType.Name.Value }, { "kind", TypeKind.Union },
                    });
            }
            else if (definition is InterfaceTypeDefinitionNode interfaceType)
            {
                types.Add(
                    new Dictionary<string, object?>
                    {
                        { "name", interfaceType.Name.Value }, { "kind", TypeKind.Union },
                    });
            }
        }

        return types;
    }

    [GraphQLType(typeof(AnyType))]
    [BindMember(nameof(Component.Values))]
    public async Task<IDictionary<string, object?>?> GetValues(
        [Parent] Component component,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        if (component.Values is null)
        {
            return null;
        }

        ISchema? schema = await componentService.GetSchemaByIdAsync(
            component.Id,
            cancellationToken);

        if (schema is null)
        {
            return null;
        }

        var document = JsonDocument.Parse(component.Values!);
        return ValueHelper.DeserializeDictionary(document.RootElement, schema.QueryType);
    }

    [GraphQLType(typeof(AnyType))]
    public async Task<IDictionary<string, object?>?> GetDefaults(
        [Parent] Component component,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken) =>
        await componentService.GetDefaultValuesAsync(component.Id, cancellationToken);

    public async Task<IReadOnlyList<SchemaViolation>> GetSchemaViolations(
        [Parent] Component component,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        if (component.Values is null)
        {
            return Array.Empty<SchemaViolation>();
        }

        IDictionary<string, object?>? values =
            await GetValues(component, componentService, cancellationToken);

        if (values is null)
        {
            return Array.Empty<SchemaViolation>();
        }

        return await componentService.GetSchemaViolationsAsync(
            component.Id,
            values,
            cancellationToken);
    }

    private IDictionary<string, object?> CreateFieldDto(
        FieldDefinitionNode field,
        IDictionary<string, TypeKind> typeKinds)
    {
        // TODO : add validator
        return new Dictionary<string, object?>()
        {
            { "name", field.Name.Value }, { "type", CreateTypeDto(field.Type, typeKinds) }
        };
    }

    private IDictionary<string, object?> CreateTypeDto(
        ITypeNode type,
        IDictionary<string, TypeKind> typeKinds)
    {
        return type switch
        {
            NonNullTypeNode nnt => new Dictionary<string, object?>
            {
                { "kind", TypeKind.NonNull }, { "ofType", CreateTypeDto(nnt.Type, typeKinds) },
            },
            ListTypeNode lt => new Dictionary<string, object?>
            {
                { "kind", TypeKind.List }, { "ofType", CreateTypeDto(lt.Type, typeKinds) },
            },
            NamedTypeNode nt => new Dictionary<string, object?>
            {
                { "kind", typeKinds[nt.Name.Value] }, { "name", nt.Name.Value },
            },
            _ => throw new InvalidOperationException("Invalid Type Structure.")
        };
    }

    private IDictionary<string, TypeKind> CreateTypeKindLookup(DocumentNode document)
    {
        IDictionary<string, TypeKind> typeKinds = new Dictionary<string, TypeKind>()
        {
            { ScalarNames.String, TypeKind.Scalar },
            { ScalarNames.Int, TypeKind.Scalar },
            { ScalarNames.Boolean, TypeKind.Scalar },
            { ScalarNames.Float, TypeKind.Scalar }
        };

        foreach (IDefinitionNode? definition in document.Definitions)
        {
            switch (definition)
            {
                case ObjectTypeDefinitionNode objectType:
                    typeKinds[objectType.Name.Value] = TypeKind.Object;
                    break;
                case EnumTypeDefinitionNode enumType:
                    typeKinds[enumType.Name.Value] = TypeKind.Enum;
                    break;
                case InterfaceTypeDefinitionNode interfaceType:
                    typeKinds[interfaceType.Name.Value] = TypeKind.Interface;
                    break;
                case UnionTypeDefinitionNode unionType:
                    typeKinds[unionType.Name.Value] = TypeKind.Union;
                    break;
                default:
                    throw new InvalidOperationException("Invalid type provided");
            }
        }

        return typeKinds;
    }
}