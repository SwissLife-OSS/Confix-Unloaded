using System.CommandLine;

internal sealed class TagOption : Option<string>
{
    public TagOption() : base("--tag")
    {
        Description = "Specifies the tag";
        AddAlias("-t");
    }
}
