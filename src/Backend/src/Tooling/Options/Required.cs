namespace Confix.Tooling.Option;

internal static class Required<TOption> where TOption : System.CommandLine.Option, new()
{
    private static TOption? _instance;

    public static TOption Instance { get => _instance ??= new() { IsRequired = true }; }
}
