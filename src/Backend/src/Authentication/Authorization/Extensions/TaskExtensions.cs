namespace System.Linq;

public static class TaskExtensions
{
    public static async IAsyncEnumerable<T> Unwrap<T>(this Task<IReadOnlyList<T>> task)
    {
        var result = await task;
        foreach (var element in result)
        {
            yield return element;
        }
    }
}
