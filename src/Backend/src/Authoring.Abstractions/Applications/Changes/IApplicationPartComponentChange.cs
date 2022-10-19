using System;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public interface IApplicationPartComponentChange : IApplicationPartChange
{
    [GraphQLType(typeof(ApplicationPartComponent))]
    [GraphQLName("partComponent")]
    Guid PartComponentId { get; }

    int PartComponentVersion { get; }
}
