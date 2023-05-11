using System.Text.Json;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class ComponentMutations
{
    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    [Error(typeof(ComponentValidationFailed))]
    public async Task<Component> CreateComponentAsync(
        [Service] IComponentService service,
        string name,
        string @namespace,
        IReadOnlyList<ComponentScopeInput> scopes,
        [DefaultValue("type Component { text: String! }")] string schema,
        [GraphQLType(typeof(JsonType))] JsonElement values,
        CancellationToken cancellationToken)
    {
        return await service.CreateAsync(
            name,
            schema,
            @namespace,
            scopes.Select(x => x.GetScope()).ToArray(),
            values.Deserialize<Dictionary<string, object?>>()!,
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
        return await service.ChangeComponentScopeByIdAsync(
            id,
            scopes.Select(x => x.GetScope()).ToArray(),
            cancellationToken);
    }

    [Error(typeof(UnauthorizedOperationException))]
    [Error(typeof(SchemaInvalidError))]
    public async Task<Component> UpdateComponentSchemaAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        string schema,
        CancellationToken cancellationToken)
    {
        return await service.SetSchemaAsync(id, schema, cancellationToken);
    }

    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> UpdateComponentValuesAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        return await service.SetValuesAsync(id, values, cancellationToken);
    }
}
