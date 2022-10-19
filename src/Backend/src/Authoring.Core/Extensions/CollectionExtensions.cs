namespace Confix.Authoring.Extensions;

internal static class CollectionExtensions
{
    public static ICollection<T> Replace<T>(this ICollection<T> collection, T item, Func<T> factory)
        where T : class
    {
        return collection
            .Select(x => item == x ? factory() : x)
            .ToArray();
    }
}
