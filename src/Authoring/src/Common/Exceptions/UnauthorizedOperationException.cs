namespace Confix.Common.Exceptions;

public class UnauthorizedOperationException : Exception
{
    public UnauthorizedOperationException()
        : base("You are not allowed to perform this operation")
    {
    }
}
