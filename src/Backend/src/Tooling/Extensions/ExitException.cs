internal sealed class ExitException : Exception
{
    public ExitException() : base("")
    {
    }

    public ExitException(string message) : base(message)
    {
    }
}
