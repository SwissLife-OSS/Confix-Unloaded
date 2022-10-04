using Confix.Common;
using Confix.Common.Exceptions;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authentication.Authorization;

public class RoleService : IRoleService
{
    private readonly IRoleStore _roleStore;
    private readonly IAuthorizationService _authorizationService;

    public RoleService(
        IRoleStore roleStore,
        IAuthorizationService authorizationService)
    {
        _roleStore = roleStore;
        _authorizationService = authorizationService;
    }

    public async Task<Role> CreateAsync(
        string name,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
    {
        var role = new Role(Guid.NewGuid(), name, permissions);

        if (!await _authorizationService
                .RuleFor<Role>()
                .IsAuthorizedAsync(role, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        await _roleStore.UpsertAsync(role, cancellationToken);

        return role;
    }

    public async Task<Role> UpdateAsync(
        Guid id,
        string? name,
        IReadOnlyList<Permission>? permissions,
        CancellationToken cancellationToken)
    {
        using (var scope = Transactions.Create())
        {
            var role = await _roleStore.GetByIdAsync(id, cancellationToken);

            if (!await _authorizationService
                    .RuleFor<Role>()
                    .IsAuthorizedAsync(role, Write, cancellationToken))
            {
                throw new UnauthorizedOperationException();
            }

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

    public async Task<Role?> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        using (var scope = Transactions.Create())
        {
            var role = await _roleStore.DeleteByIdAsync(id, cancellationToken);

            if (!await _authorizationService
                    .RuleFor<Role>()
                    .IsAuthorizedAsync(role, Write, cancellationToken))
            {
                throw new UnauthorizedOperationException();
            }

            scope.Complete();

            return role;
        }
    }
}
