using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;
using HotChocolate.Utilities;

namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationIdInvalid : IUserError
{
    public ApplicationIdInvalid(Guid applicationPartId)
    {
        ApplicationId = applicationPartId;
    }

    public string Code => GetType().Name;

    public string Message => "The application id invalid.";

    [ID(nameof(Application))]
    public Guid ApplicationId { get; }

    public static ApplicationIdInvalid? CreateErrorFrom(Exception exception)
    {
        if (exception is EntityIdInvalidException ex &&
            ex.EntityName.EqualsOrdinal(nameof(Application)))
        {
            return new ApplicationIdInvalid(ex.EntityId);
        }

        return null;
    }
}
