using System.CommandLine;
using Confix.Tooling.Option;

namespace Confix.Tooling;

internal sealed class ConfixRootCommand : Command
{
    public ConfixRootCommand() : base("confix")
    {
        AddGlobalOption(Required<UrlOption>.Instance);
        AddGlobalOption(Required<ApiKeyOption>.Instance);
        AddCommand(new ClaimCommand());
    }
}
