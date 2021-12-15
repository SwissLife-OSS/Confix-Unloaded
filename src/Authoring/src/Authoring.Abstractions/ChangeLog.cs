using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record ChangeLog
{
    [ID]
    public Guid Id { get; init; }

    public IChange Change { get; init; }

    public UserInfo ModifiedBy { get; init; }

    public DateTime ModifiedAt { get; init; }
}
