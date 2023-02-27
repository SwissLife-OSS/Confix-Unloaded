namespace Confix.Tooling.Option;

internal class Optional<TOption> where TOption : System.CommandLine.Option, new()
{
    private static TOption? _instance;

    public static TOption Instance { get => _instance ??= new() { IsRequired = false }; }
}
