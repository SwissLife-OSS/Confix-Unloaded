using System;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public interface IApplicationPartChange : IApplicationChange
{
    [GraphQLType(typeof(ApplicationPart))]
    [GraphQLName("part")]
    Guid PartId { get; }

    int PartVersion { get; }
}
