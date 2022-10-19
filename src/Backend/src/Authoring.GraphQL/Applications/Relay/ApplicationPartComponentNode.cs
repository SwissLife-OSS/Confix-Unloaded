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

    [GraphQLType(typeof(AnyType))]
    [BindMember(nameof(Component.Values))]
    public async Task<Dictionary<string, object?>?> GetValuesAsync(
        [Parent] ApplicationPartComponent applicationPartComponent,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        if (applicationPartComponent.Values is null)
        {
            return null;
        }

        var schema = await componentService.GetSchemaByIdAsync(applicationPartComponent.ComponentId,
            cancellationToken);

        if (schema is null)
        {
            return null;
        }

        var document = JsonDocument.Parse(applicationPartComponent.Values!);

        return ValueHelper.DeserializeDictionary(document.RootElement, schema.QueryType);
    }
}
