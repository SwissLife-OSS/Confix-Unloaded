namespace Confix.Authoring.GraphQL
{
    public class ApplicationNameTakenError
        : IAddApplicationError
        , IUserError
    {
        public ApplicationNameTakenError(string applicationName)
        {
            Message = string.Format(
                "The application name `{0}` is already taken.",
                applicationName);
        }

        public string Code => GetType().Name;

        public string Message { get; }
    }
}
