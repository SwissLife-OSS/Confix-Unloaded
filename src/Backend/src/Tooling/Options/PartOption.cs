using System.CommandLine;

internal sealed class PartOption : Option<string>
{
    public PartOption() : base("--part")
    {
        Description = "Specifies the name of the published application part";
        AddAlias("-p");
    }
}
