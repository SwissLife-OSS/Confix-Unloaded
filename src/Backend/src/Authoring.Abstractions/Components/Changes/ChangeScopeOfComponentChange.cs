using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Changes;

public sealed class ChangeScopeOfComponentChange
    : IComponentChange
{
    public ChangeScopeOfComponentChange(
        Guid componentId,
        int componentVersion,
        IReadOnlyList<ComponentScope> scopes)
    {
        ComponentId = componentId;
        ComponentVersion = componentVersion;
        Scopes = scopes;
    }

    public IReadOnlyList<ComponentScope> Scopes { get; init; }

    public string Kind => nameof(ChangeScopeOfComponentChange);

    [GraphQLName("component")]
    [UseDataLoader(typeof(IComponentDataLoader))]
    public Guid ComponentId { get; init; }

    public int ComponentVersion { get; init; }
}
