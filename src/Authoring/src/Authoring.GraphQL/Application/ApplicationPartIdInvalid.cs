using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    public class ApplicationPartIdInvalid
        : IUserError
        , IAddComponentsToApplicationPartError
        , IRenameApplicationPartError
    {
        public ApplicationPartIdInvalid(EntityIdInvalidException ex) {
            
        }


        public ApplicationPartIdInvalid(Guid applicationPartId)
        {
            ApplicationPartId = applicationPartId;
        }

        public string Code => GetType().Name;

        public string Message => "The application part id invalid.";

        [ID(nameof(ApplicationPart))]
        public Guid ApplicationPartId { get; }
    }
}
