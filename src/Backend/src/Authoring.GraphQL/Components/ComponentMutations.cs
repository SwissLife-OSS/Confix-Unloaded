using System.Text.Json;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class ComponentMutations
{
    [Error(typeof(SchemaInvalidError))]
    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    [Error(typeof(ComponentValidationFailed))]
    public async Task<Component> CreateComponentAsync(
        [Service] IComponentService service,
        string name,
        string @namespace,
        IReadOnlyList<ComponentScopeInput> scopes,
        [GraphQLType(typeof(SdlType))]
        [DefaultValue("type Component { text: String! }")]
        string schema,
        [GraphQLType(typeof(JsonType))] JsonElement values,
        CancellationToken cancellationToken)
    {
        return await service.CreateAsync(
            name,
            schema,
            @namespace,
            scopes.Select(x => x.GetScope()).ToArray(),
            values,
            cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> RenameComponentAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        return await service.RenameAsync(id, name, cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [Error(typeof(ComponentValidationFailed))]
    public async Task<Component> UpdateComponentScopes(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        IReadOnlyList<ComponentScopeInput> scopes,
        CancellationToken cancellationToken)
    {
        return await service.UpdateScopesAsync(
            id,
            scopes.Select(x => x.GetScope()).ToArray(),
            cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [Error(typeof(SchemaInvalidError))]
    public async Task<Component> UpdateComponentSchemaAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        [GraphQLType(typeof(SdlType))] string schema,
        [GraphQLType(typeof(JsonType))] JsonElement values,
        CancellationToken cancellationToken)
    {
        return await service.UpdateSchemaAsync(id, schema, values, cancellationToken);
    }

    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> UpdateComponentValuesAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        [GraphQLType(typeof(JsonType))] JsonElement values,
        CancellationToken cancellationToken)
    {
        return await service.UpdateValuesAsync(id, values, cancellationToken);
    }
}
