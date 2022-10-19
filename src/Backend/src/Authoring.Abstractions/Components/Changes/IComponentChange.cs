using Confix.Authoring.Store;
using HotChocolate;

namespace Confix.Authoring.Changes;

public interface IComponentChange : IChange
{
    [GraphQLType(typeof(Component))]
    [GraphQLName("component")]
    Guid ComponentId { get; }

    int ComponentVersion { get; }
}
