using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL
{
    public class UpdateApplicationPartPayload
    {
        public UpdateApplicationPartPayload(
            ApplicationPart applicationPart,
            Application application)
        {
            ApplicationPart = applicationPart;
            Application = application;
        }

        public ApplicationPart? ApplicationPart { get; }
        public Application Application { get; }
    }
}