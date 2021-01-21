namespace Confix.Authoring.GraphQL
{
    public interface IUserError
    {
        string Code { get; }

        string Message { get; }
    }
}
