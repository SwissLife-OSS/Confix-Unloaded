using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class ComponentMutations
{
    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> CreateComponentAsync(
        [Service] IComponentService service,
        string name,
        string @namespace,
        [DefaultValue("type Component { text: String! }")] string schema,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?>? values,
        CancellationToken cancellationToken)
        => await service.CreateAsync(name, schema, @namespace, values, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> RenameComponentAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        string name,
        CancellationToken cancellationToken)
        => await service.RenameAsync(id, name, cancellationToken);

    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> UpdateComponentSchemaAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        string schema,
        CancellationToken cancellationToken)
        => await service.SetSchemaAsync(id, schema, cancellationToken);

    [Error(typeof(ValueSchemaViolation))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Component> UpdateComponentValuesAsync(
        [Service] IComponentService service,
        [ID(nameof(Component))] Guid id,
        [GraphQLType(typeof(AnyType))] Dictionary<string, object?> values,
        CancellationToken cancellationToken)
        => await service.SetValuesAsync(id, values, cancellationToken);
}