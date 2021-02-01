namespace Confix.Authoring.GraphQL
{
    public class ApplicationNameTaken
        : IAddApplicationError
        , IRenameApplicationError
        , IUserError
    {
        public ApplicationNameTaken(string applicationName)
        {
            Message = $"The application name `{applicationName}` is already taken.";
            ApplicationName = applicationName;
        }

        public string Code => GetType().Name;

        public string Message { get; }

        public string ApplicationName { get; }
    }
}
