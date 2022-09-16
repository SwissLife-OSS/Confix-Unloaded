using System.Transactions;
using Confix.Common;
using Confix.Common.Exceptions;
using static System.Transactions.TransactionScopeAsyncFlowOption;
using static System.Transactions.TransactionScopeOption;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authentication.Authorization;

public class GroupService : IGroupService
{
    private readonly IGroupStore _groupStore;
    private readonly ISessionAccessor _sessionAccessor;

    public GroupService(IGroupStore groupStore, ISessionAccessor sessionAccessor)
    {
        _groupStore = groupStore;
        _sessionAccessor = sessionAccessor;
    }

    public async Task<Group> CreateAsync(
        string name,
        IReadOnlySet<Requirement> requirements,
        IReadOnlySet<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var group = new Group(Guid.NewGuid(), name, requirements, roles);

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
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        using (var scope = Transactions.Create())
        {
            var group = await _groupStore.GetByIdAsync(id, cancellationToken);
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
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await _groupStore.DeleteByIdAsync(id, cancellationToken);
    }
}
