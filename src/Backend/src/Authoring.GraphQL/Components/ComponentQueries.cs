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
        Guid? applicationId,
        Guid? applicationPartId,
        string? search)
    {
        return await context.ApplyPaginationAsync((skip, take, ct) => componentService
            .Search(skip, take, applicationId, applicationPartId, search, ct));
    }

    public Task<Component?> GetComponentByIdAsync(
        [ID(nameof(Component))] Guid id,
        [Service] IComponentService componentService,
        CancellationToken cancellationToken)
    {
        return componentService.GetByIdAsync(id, cancellationToken);
    }
}
