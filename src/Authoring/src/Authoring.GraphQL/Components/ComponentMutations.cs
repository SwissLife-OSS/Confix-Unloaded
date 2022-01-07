using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Components
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ComponentMutations
    {
        [Error(typeof(ValueSchemaViolation))]
        public async Task<Component> CreateComponentAsync(
            [Service] IComponentService service,
            string name,
            [DefaultValue("type Component { text: String! }")] string schema,
            [GraphQLType(typeof(AnyType))] Dictionary<string, object?>? values,
            CancellationToken cancellationToken)
            => await service.CreateAsync(name, schema, values, cancellationToken);

        public async Task<Component> RenameComponentAsync(
            [Service] IComponentService service,
            [ID(nameof(Component))] Guid id,
            string name,
            CancellationToken cancellationToken)
            => await service.RenameAsync(id, name, cancellationToken);

        public async Task<Component> UpdateComponentSchemaAsync(
            [Service] IComponentService service,
            [ID(nameof(Component))] Guid id,
            string schema,
            CancellationToken cancellationToken)
            => await service.SetSchemaAsync(id, schema, cancellationToken);

        [Error(typeof(ValueSchemaViolation))]
        public async Task<Component> UpdateComponentValuesAsync(
            [Service] IComponentService service,
            [ID(nameof(Component))] Guid id,
            [GraphQLType(typeof(AnyType))] Dictionary<string, object?> values,
            CancellationToken cancellationToken)
            => await service.SetValuesAsync(id, values, cancellationToken);
    }
}
