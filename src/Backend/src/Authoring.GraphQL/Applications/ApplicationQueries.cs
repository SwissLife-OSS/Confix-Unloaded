using Confix.Authoring.GraphQL.Components;
using Confix.Authoring.Store;
using HotChocolate.Resolvers;
using HotChocolate.Types.Pagination;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ApplicationQueries
{
    /// <summary>
    ///     Get all application configurations.
    /// </summary>
    [UsePaging(AllowBackwardPagination = false, IncludeTotalCount = false)]
    public async Task<Connection<Application>> GetApplicationsAsync(
        [Service] IApplicationService applicationService,
        IResolverContext context,
        string? search)
    {
        return await context.ApplyPaginationAsync(
            (skip, take, ct) => applicationService.Search(skip, take, search, ct));
    }

    /// <summary>
    ///     Get a specific application configuration by its ID.
    /// </summary>
    /// <param name="applicationService"></param>
    /// <param name="id">The application ID.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns></returns>
    public Task<Application?> GetApplicationByIdAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(Application))] Guid id,
        CancellationToken cancellationToken)
    {
        return applicationService.GetByIdAsync(id, cancellationToken);
    }

    public Task<ApplicationPart?> GetApplicationPartByIdAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPart))] Guid id,
        CancellationToken cancellationToken)
    {
        return applicationService.GetApplicationPartByIdAsync(id, cancellationToken);
    }

    public Task<ApplicationPartComponent?> GetApplicationPartComponentByIdAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
        CancellationToken cancellationToken)
    {
        return applicationService
            .GetApplicationPartComponentByIdAsync(partComponentId, cancellationToken);
    }
}
