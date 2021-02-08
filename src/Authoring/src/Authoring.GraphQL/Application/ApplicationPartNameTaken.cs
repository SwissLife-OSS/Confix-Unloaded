namespace Confix.Authoring.GraphQL
{
    public class ApplicationPartNameTaken : UserError
    {
        public ApplicationPartNameTaken(string applicationName)
            : base($"The application part name `{applicationName}` is already taken.")
        {
            ApplicationName = applicationName;
        }

        public ApplicationPartNameTaken(NameTakenException exception)
            : this(exception.Name)
        {
        }

        public string ApplicationName { get; }
    }

    public class UserError : IUserError
    {
        public UserError(string message)
        {
            Message = message;
        }

        public string Code => GetType().Name;

        public string Message { get; }
    }
}
