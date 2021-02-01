using System;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    public class ApplicationIdInvalid
        : IUserError
        , IAddComponentsToApplicationPartError
        , IRenameApplicationError
        , IRenameApplicationPartError
    {
        public ApplicationIdInvalid(Guid applicationPartId)
        {
            ApplicationId = applicationPartId;
        }

        public string Code => GetType().Name;

        public string Message => "The application id invalid.";

        [ID(nameof(Application))]
        public Guid ApplicationId { get; }
    }
}
