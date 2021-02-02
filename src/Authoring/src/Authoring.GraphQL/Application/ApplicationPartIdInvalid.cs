using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;
using HotChocolate.Utilities;

namespace Confix.Authoring.GraphQL
{
    public class ApplicationPartIdInvalid
        : IUserError
        , IAddComponentsToApplicationPartError
        , IRenameApplicationPartError
    {
        public ApplicationPartIdInvalid(Guid applicationPartId)
        {
            ApplicationPartId = applicationPartId;
        }

        public string Code => GetType().Name;

        public string Message => "The application part id invalid.";

        [ID(nameof(ApplicationPart))]
        public Guid ApplicationPartId { get; }

        public static ApplicationPartIdInvalid? CreateErrorFrom(Exception exception)
        {
            if (exception is EntityIdInvalidException ex &&
                ex.EntityName.EqualsOrdinal(nameof(ApplicationPart)))
            {
                return new ApplicationPartIdInvalid(ex.EntityId);
            }

            return null;
        }
    }
}
