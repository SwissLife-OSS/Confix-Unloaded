using System.CommandLine;

internal sealed class ApiKeyOption : Option<string>
{
    public ApiKeyOption() : base("--api-key")
    {
        Description = "The api key for authorization on confix";
        AddAlias("-k");
    }
}
