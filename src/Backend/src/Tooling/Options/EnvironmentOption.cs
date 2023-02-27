using System.CommandLine;

internal sealed class EnvironmentOption : Option<string>
{
    public EnvironmentOption() : base("--environment")
    {
        Description = "Specifies the name of the environment";
        AddAlias("-e");
        AddAlias("-env");
    }
}
