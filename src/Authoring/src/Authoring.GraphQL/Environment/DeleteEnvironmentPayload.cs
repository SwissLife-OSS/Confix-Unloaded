using System;
using System.Collections.Generic;

namespace Confix.Authoring.GraphQL;

public class DeleteEnvironmentPayload
{
    public Guid? DeletedId { get; }
    public Environment? Environment { get; }

    public DeleteEnvironmentPayload(Guid deletedId, Environment? environment)
    {
        DeletedId = deletedId;
        Environment = environment;
    }
}
