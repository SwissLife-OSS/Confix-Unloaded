namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationNameTaken : UserError
{
    public ApplicationNameTaken(string applicationName)
        : base($"The application name `{applicationName}` is already taken.")
    {
        ApplicationName = applicationName;
    }

    public ApplicationNameTaken(NameTakenException exception)
        : this(exception.Name)
    {
    }

    public string ApplicationName { get; }
}
