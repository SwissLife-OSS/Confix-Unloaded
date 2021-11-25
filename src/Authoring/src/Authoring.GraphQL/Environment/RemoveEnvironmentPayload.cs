using System;
using System.Collections.Generic;

namespace Confix.Authoring.GraphQL;

public class RemoveEnvironmentPayload
{
    public Guid? RemovedId { get; }
    public Environment? Environment { get; }

    public RemoveEnvironmentPayload(Guid deletedId, Environment? environment)
    {
        RemovedId = deletedId;
        Environment = environment;
    }
}
