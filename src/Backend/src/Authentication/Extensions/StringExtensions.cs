namespace Confix.Authentication;

internal static class StringExtensions
{
    public static string? ValueOrNull(this string? str)
    {
        if (string.IsNullOrWhiteSpace(str))
        {
            return null;
        }

        return str;
    }
}
