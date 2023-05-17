using System.Text.Json;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(typeof(ApplicationPartComponent))]
public sealed class ApplicationPartComponentNode
{
    [BindMember(nameof(ApplicationPartComponent.ComponentId))]
    public Task<Component?> GetDefinitionAsync(
        [Parent] ApplicationPartComponent applicationPartComponent,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        return componentService
            .GetByIdAsync(applicationPartComponent.ComponentId, cancellationToken);
    }

    [GraphQLType(typeof(JsonType))]
    [BindMember(nameof(Component.Values))]
    public string? GetValuesAsync([Parent] ApplicationPartComponent applicationPartComponent)
        => applicationPartComponent.Values;
}
