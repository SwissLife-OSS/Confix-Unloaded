using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class GroupQueries
{
    [UsePaging]
    public Task<IQueryable<Group>> SearchGroups(
        [Service] IGroupService groupService,
        string? search,
        CancellationToken cancellationToken)
    {
        return groupService.SearchGroupAsync(search, cancellationToken);
    }

    public Task<Group?> GetGroupByIdAsync(
        [Service] IGroupService groupService,
        [ID(nameof(Group))] Guid id,
        CancellationToken cancellationToken)
    {
        return groupService.GetByIdAsync(id, cancellationToken);
    }
}
