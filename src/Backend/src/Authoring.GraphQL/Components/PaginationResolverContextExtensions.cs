using HotChocolate.Resolvers;
using HotChocolate.Types.Pagination;

namespace Confix.Authoring.GraphQL.Components;

/// <summary>
/// Extensions for <see cref="IResolverContext"/> that add pagination functionality.
/// </summary>
public static class PaginationResolverContextExtensions
{
    /// <summary>
    /// Applies the pagination arguments from the GraphQL request to the provided fetch function.
    /// </summary>
    /// <param name="context">The resolver context.</param>
    /// <param name="fetch">The function that fetches the items from the database.</param>
    /// <typeparam name="T">The type of the items that are fetched.</typeparam>
    /// <returns>A connection that contains the paginated items.</returns>
    public static async Task<Connection<T>> ApplyPaginationAsync<T>(
        this IResolverContext context,
        Func<int, int, CancellationToken, Task<IReadOnlyList<T>>> fetch)
    {
        var first = context.ArgumentValue<int?>("first");
        var after = context.ArgumentValue<string?>("after");

        first ??= 20;
        var skip = after is { } ? IndexEdge<T>.DeserializeCursor(after) : 0;

        var result = await fetch(skip, first.Value + 1, context.RequestAborted);

        // when we have more items than requested, we know that there is a next page
        var hasNextPage = first.Value < result.Count;

        // create the edges for the pagination info and remove the last item if there is a next page
        var edges = result.Select(IndexEdge<T>.Create).Take(first.Value).ToList();

        return new Connection<T>(
            edges,
            new ConnectionPageInfo(
                hasNextPage,
                skip > 0,
                edges.FirstOrDefault()?.Cursor,
                edges.LastOrDefault()?.Cursor));
    }
}
