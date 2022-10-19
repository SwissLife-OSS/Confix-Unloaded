using System.Collections.Immutable;
using Confix.Common;
using Confix.Common.Exceptions;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authentication.Authorization;

internal sealed class GroupService : IGroupService
{
    private readonly IGroupStore _groupStore;
    private readonly IAuthorizationService _authorizationService;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IDataLoader<Guid, Group?> _groupById;

    public GroupService(
        IGroupStore groupStore,
        IAuthorizationService authorizationService,
        ISessionAccessor sessionAccessor,
        IDataLoader<Guid, Group?> groupById)
    {
        _groupStore = groupStore;
        _authorizationService = authorizationService;
        _sessionAccessor = sessionAccessor;
        _groupById = groupById;
    }

    public async Task<Group> CreateAsync(
        string name,
        IEnumerable<Requirement> requirements,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
    {
        var group = new Group(Guid.NewGuid(),
            name,
            requirements.ToImmutableHashSet(),
            roles.ToImmutableHashSet());

        if (!await _authorizationService
                .RuleFor<Group>()
                .IsAuthorizedAsync(group, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        await _groupStore.UpsertAsync(group, cancellationToken);

        return group;
    }

    public async Task<Group> RenameGroupAsync(
        Guid id,
        string name,
        CancellationToken cancellationToken)
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

        group = group with { Name = name };
        await _groupStore.UpsertAsync(group, cancellationToken);

        return group;
    }

    public async Task<Group> UpdateGroupRequirementsAsync(
        Guid id,
        IEnumerable<Requirement> requirements,
        CancellationToken cancellationToken)
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

        group = group with { Requirements = requirements.ToImmutableHashSet() };
        await _groupStore.UpsertAsync(group, cancellationToken);

        return group;
    }

    public async Task<Group> UpdateGroupRolesAsync(
        Guid id,
        IEnumerable<RoleScope> roles,
        CancellationToken cancellationToken)
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

        group = group with { Roles = roles.ToImmutableHashSet() };
        await _groupStore.UpsertAsync(group, cancellationToken);

        return group;
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

    public async Task<IQueryable<Group>> SearchGroupAsync(
        string? name,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null ||
            !session.HasPermission(WellKnownNamespaces.Global, Scope.Identity, Read))
        {
            return Array.Empty<Group>().AsQueryable();
        }

        var queryable = _groupStore.Query();
        if (name is { })
        {
            queryable = queryable.Where(x => x.Name.Contains(name));
        }

        return queryable;
    }

    public async Task<Group?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var group = await _groupById.LoadAsync(id, cancellationToken);
        return await _authorizationService
            .RuleFor<Group>()
            .AuthorizeOrNullAsync(group, Read, cancellationToken);
    }
}
