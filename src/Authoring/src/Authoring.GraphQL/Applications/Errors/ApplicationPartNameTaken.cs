namespace Confix.Authoring.GraphQL.Applications;

public sealed class ApplicationPartNameTaken : UserError
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
