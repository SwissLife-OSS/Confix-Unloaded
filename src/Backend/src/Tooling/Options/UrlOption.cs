using System.CommandLine;

internal sealed class UrlOption : Option<string>
{
    public UrlOption() : base("--url")
    {
        Description = "The url of the Confix service.";
        AddAlias("-u");
    }
}
