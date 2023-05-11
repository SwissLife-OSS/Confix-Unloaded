using Confix.Authoring.Store;
using HotChocolate.Resolvers;
using HotChocolate.Types.Pagination;

namespace Confix.Authoring.GraphQL.Components;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ComponentQueries
{
    [UsePaging(AllowBackwardPagination = false, IncludeTotalCount = false)]
    public async Task<Connection<Component>> GetComponents(
        [Service] IComponentService componentService,
        IResolverContext context,
        IReadOnlyList<ComponentScope> scopes,
        string? search)
    {
        return await context.ApplyPaginationAsync((skip, take, ct) =>
            componentService.Search(scopes, search, skip, take, ct));
    }

    public async Task<Component?> GetComponentByIdAsync(
        [ID(nameof(Component))] Guid id,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        return await componentService.GetByIdAsync(id, cancellationToken);
    }
}
