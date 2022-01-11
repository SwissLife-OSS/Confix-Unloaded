using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store;

public record ChangeLog
{
    public ChangeLog(Guid id, IChange change, UserInfo modifiedBy, DateTime modifiedAt)
    {
        Id = id;
        Change = change;
        ModifiedBy = modifiedBy;
        ModifiedAt = modifiedAt;
    }

    [ID]
    public Guid Id { get; init; }

    public IChange Change { get; init; }

    public UserInfo ModifiedBy { get; init; }

    public DateTime ModifiedAt { get; init; }
}
