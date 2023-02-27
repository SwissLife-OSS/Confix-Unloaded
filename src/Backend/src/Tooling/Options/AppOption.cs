using System.CommandLine;

internal sealed class AppOption : Option<string>
{
    public AppOption() : base("--app")
    {
        Description = "Specifies the name of the published application";
        AddAlias("-a");
    }
}
