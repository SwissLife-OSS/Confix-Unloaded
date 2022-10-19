namespace Confix.Authoring.GraphQL;

[InterfaceType("UserError")]
public interface IUserError
{
    string Code { get; }

    string Message { get; }
}
