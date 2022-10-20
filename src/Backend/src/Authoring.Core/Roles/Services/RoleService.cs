using Confix.Common;
using Confix.Common.Exceptions;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authentication.Authorization;

internal sealed class RoleService : IRoleService
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IDataLoader<Guid, Role?> _roleById;
    private readonly IRoleStore _roleStore;
    private readonly ISessionAccessor _sessionAccessor;

    public RoleService(
        IRoleStore roleStore,
        IAuthorizationService authorizationService,
        ISessionAccessor sessionAccessor,
        IDataLoader<Guid, Role?> roleById)
    {
        _roleStore = roleStore;
        _authorizationService = authorizationService;
        _sessionAccessor = sessionAccessor;
        _roleById = roleById;
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

    public async Task<Role> UpdateRolePermissionsAsync(
        Guid id,
        IReadOnlyList<Permission> permissions,
        CancellationToken cancellationToken)
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

        role = role with { Permissions = permissions };

        return await _roleStore.UpsertAsync(role, cancellationToken);
    }

    public async Task<Role> RenameRoleAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken)
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

        role = role with { Name = name };

        return await _roleStore.UpsertAsync(role, cancellationToken);
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

    public async Task<Role?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var role = await _roleById.LoadAsync(id, cancellationToken);

        return await _authorizationService
            .RuleFor<Role>()
            .AuthorizeOrNullAsync(role, Read, cancellationToken);
    }

    public async Task<IReadOnlyList<Role>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _authorizationService
            .RuleFor<Role>()
            .AuthorizeAndFilterAsync(await _roleById.LoadAsync(ids.ToArray(), cancellationToken),
                Read,
                cancellationToken)
            .ToListAsync(cancellationToken);
    }

    public async Task<IQueryable<Role>> SearchRoleAsync(
        string? name,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);

        if (session is null ||
            !session.HasPermission(WellKnownNamespaces.Global, Scope.Identity, Read))
        {
            return Array.Empty<Role>().AsQueryable();
        }

        var queryable = _roleStore.Query();

        if (name is { })
        {
            queryable = queryable.Where(x => x.Name.Contains(name));
        }

        return queryable;
    }
}
