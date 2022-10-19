using Confix.Authoring.Store;
using HotChocolate.Utilities;

namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationIdInvalid : IUserError
{
    public ApplicationIdInvalid(Guid applicationPartId)
    {
        ApplicationId = applicationPartId;
    }

    [ID(nameof(Application))]
    public Guid ApplicationId { get; }

    public string Code => GetType().Name;

    public string Message => "The application id invalid.";

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
