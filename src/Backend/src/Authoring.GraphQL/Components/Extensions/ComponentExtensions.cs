using System.Text.Json;
using Confix.Authoring.Store;
using HotChocolate.Language;
using HotChocolate.Language.Utilities;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType<Component>]
public sealed class ComponentExtensions
{
    public async Task<IEnumerable<ChangeLog>> GetChangeLogAsync(
        [Parent] Component application,
        [Service] IChangeLogService service,
        CancellationToken cancellationToken)
        => await service.GetByComponentId(application.Id, cancellationToken);

    [BindMember(nameof(Component.Schema))]
    [GraphQLType<SdlType>]
    public string? GetSchema([Parent] Component component)
            => Utf8GraphQLParser.Parse(component.Schema).Print();

    [BindMember(nameof(Component.Values))]
    [GraphQLType<JsonType>]
    public JsonDocument GetValues([Parent] Component component)
        => JsonDocument.Parse(component.Values);
}
