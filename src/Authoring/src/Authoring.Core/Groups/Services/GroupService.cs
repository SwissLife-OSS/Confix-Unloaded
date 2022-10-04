using Confix.Common;
using Confix.Common.Exceptions;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authentication.Authorization;

public class GroupService : IGroupService
{
    private readonly IGroupStore _groupStore;
    private readonly IAuthorizationService _authorizationService;

    public GroupService(IGroupStore groupStore, IAuthorizationService authorizationService)
    {
        _groupStore = groupStore;
        _authorizationService = authorizationService;
    }

    public async Task<Group> CreateAsync(
        string name,
        IReadOnlySet<Requirement> requirements,
        IReadOnlySet<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        var group = new Group(Guid.NewGuid(), name, requirements, roles);

        if (!await _authorizationService
                .RuleFor<Group>()
                .IsAuthorizedAsync(group, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }


        await _groupStore.UpsertAsync(group, cancellationToken);

        return group;
    }

    public async Task<Group> UpdateAsync(
        Guid id,
        string? name,
        IReadOnlySet<Requirement>? requirements,
        IReadOnlySet<RoleScope>? roles,
        CancellationToken cancellationToken)
    {
        using (var scope = Transactions.Create())
        {
            var group = await _groupStore.GetByIdAsync(id, cancellationToken);

            if (!await _authorizationService
                    .RuleFor<Group>()
                    .IsAuthorizedAsync(group, Write, cancellationToken))
            {
                throw new UnauthorizedOperationException();
            }

            if (group is null)
            {
                throw new Exception($"Group with id ({id}) was not found.");
            }

            group = group with
            {
                Name = name ?? group.Name,
                Requirements = requirements ?? group.Requirements,
                Roles = roles ?? group.Roles
            };

            await _groupStore.UpsertAsync(group, cancellationToken);

            scope.Complete();

            return group;
        }
    }

    public async Task<Group?> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        using (var scope = Transactions.Create())
        {
            var group = await _groupStore.DeleteByIdAsync(id, cancellationToken);

            if (!await _authorizationService
                    .RuleFor<Group>()
                    .IsAuthorizedAsync(group, Write, cancellationToken))
            {
                throw new UnauthorizedOperationException();
            }

            scope.Complete();
            return group;
        }
    }
}
