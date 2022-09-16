using Confix.Common;
using Confix.Common.Exceptions;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authentication.Authorization;

public class RoleService : IRoleService
{
    private readonly IRoleStore _roleStore;
    private readonly ISessionAccessor _sessionAccessor;

    public RoleService(IRoleStore roleStore, ISessionAccessor sessionAccessor)
    {
        _roleStore = roleStore;
        _sessionAccessor = sessionAccessor;
    }

    public async Task<Role> CreateAsync(
        string name,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        var role = new Role(Guid.NewGuid(), name, permissions);

        await _roleStore.UpsertAsync(role, cancellationToken);

        return role;
    }

    public async Task<Role> UpdateAsync(
        Guid id,
        string? name,
        Permissions? permissions,
        CancellationToken cancellationToken)
    {
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        using (var scope = Transactions.Create())
        {
            var role = await _roleStore.GetByIdAsync(id, cancellationToken);
            if (role is null)
            {
                throw new Exception($"role with id ({id}) was not found.");
            }

            role = role with
            {
                Name = name ?? role.Name, Permissions = permissions ?? role.Permissions,
            };

            await _roleStore.UpsertAsync(role, cancellationToken);

            scope.Complete();

            return role;
        }
    }

    public async Task<Role> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        if (!await _sessionAccessor.HasPermission(Global, ManageIdentity, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await _roleStore.DeleteByIdAsync(id, cancellationToken);
    }
}
