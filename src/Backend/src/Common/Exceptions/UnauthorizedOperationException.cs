namespace Confix.Common.Exceptions;

public class UnauthorizedOperationException : Exception
{
    public UnauthorizedOperationException()
        : base("You are not allowed to perform this operation")
    {
    }

    public string Code { get; set; } = "UNAUTHORIZED_OPERATION_EXCEPTION";
}
