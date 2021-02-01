using System.Collections.Generic;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class AddComponentsToApplicationPartPayload
    {
        public AddComponentsToApplicationPartPayload(
            ApplicationPart applicationPart)
        {
            ApplicationPartPart = applicationPart;
        }

        public AddComponentsToApplicationPartPayload(
            IAddComponentsToApplicationPartError error)
            : this(new [] { error })
        {
        }

        public AddComponentsToApplicationPartPayload(
            IReadOnlyList<IAddComponentsToApplicationPartError> errors)
        {
            Errors = errors;
        }

        public ApplicationPart? ApplicationPartPart { get; }

        public IReadOnlyList<IAddComponentsToApplicationPartError>? Errors { get; }
    }
}
