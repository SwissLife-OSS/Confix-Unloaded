namespace Confix.Authoring.GraphQL.Applications;

public class UserError : IUserError
{
    public UserError(string message)
    {
        Message = message;
    }

    public string Code => GetType().Name;

    public string Message { get; }
}
