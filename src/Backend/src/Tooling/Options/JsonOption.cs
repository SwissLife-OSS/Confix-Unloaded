using System.CommandLine;

internal sealed class JsonOption : Option<bool>
{
    public JsonOption() : base("--json")
    {
        Description = "The output will be rendered as json";
    }
}
