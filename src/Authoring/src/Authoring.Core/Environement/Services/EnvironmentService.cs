using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authentication.Authorization;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using Confix.Common;
using Confix.Common.Exceptions;
using GreenDonut;
using IdentityModel.Internal;
using static Confix.Authentication.Authorization.Permissions;
using static Confix.Authentication.Authorization.WellKnownNamespaces;

namespace Confix.Authoring;

public class EnvironmentService : IEnvironmentService
{
    private readonly IEnvironmentStore _store;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IAuthorizationService _authorizationService;
    private readonly IDataLoader<Guid, Environment?> _environmentByIdDataLoader;

    public EnvironmentService(
        IEnvironmentStore store,
        IDataLoader<Guid, Environment?> environmentByIdDataLoader,
        ISessionAccessor sessionAccessor,
        IAuthorizationService authorizationService)
    {
        _store = store;
        _environmentByIdDataLoader = environmentByIdDataLoader;
        _sessionAccessor = sessionAccessor;
        _authorizationService = authorizationService;
    }

    public async Task<IReadOnlyList<Environment>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken = default)
    {
        if (!await _sessionAccessor.IsAuthenticated(cancellationToken))
        {
            return Array.Empty<Environment>();
        }

        var envs = await _environmentByIdDataLoader.LoadAsync(ids.ToArray(), cancellationToken);

        return envs.OfType<Environment>().ToArray();
    }

    public async Task<Environment?> GetByIdAsync(
        Guid environmentId,
        CancellationToken cancellationToken = default)
    {
        return await _authorizationService
            .RuleFor<Environment>()
            .AuthorizeOrNullAsync(
                await _environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken),
                Read,
                cancellationToken);
    }

    public async Task<Environment?> GetByNameAsync(
        string name,
        CancellationToken cancellationToken = default)
    {
        return await _authorizationService
            .RuleFor<Environment>()
            .AuthorizeOrNullAsync(
                await _store.GetByNameAsync(name, cancellationToken),
                Read,
                cancellationToken);
    }

    public async Task<Environment> CreateAsync(
        string name,
        CancellationToken cancellationToken = default)
    {
        Environment environment = new(Guid.NewGuid(), name);

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedAsync(environment, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        await _store.AddAsync(environment, cancellationToken);

        return environment;
    }

    public async Task<Environment> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default)
    {
        var environment =
            await _environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedAsync(environment, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await _store.RenameAsync(environmentId, name, cancellationToken) ??
            throw new EnvironmentNotFoundException(environmentId);
    }

    public async Task<Environment> DeleteById(
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        var environment =
            await _environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedAsync(environment, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        return await _store.RemoveByIdAsync(environmentId, cancellationToken) ??
            throw new EnvironmentNotFoundException(environmentId);
    }

    public async Task<IQueryable<Environment>> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null || session.HasPermission(Global, Scope.Environment, Read))
        {
            return Array.Empty<Environment>().AsQueryable();
        }

        return _store.SearchAsync(search, cancellationToken);
    }

    public async Task<Environment> SetParent(
        Guid environmentId,
        Guid parentId,
        CancellationToken cancellationToken = default)
    {
        var (environment, parent) = await TaskHelper.WhenAll(
            _store.GetByIdAsync(environmentId, cancellationToken),
            _store.GetByIdAsync(parentId, cancellationToken));

        if (!await _authorizationService
                .RuleFor<Environment>()
                .IsAuthorizedAsync(environment, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        if (parentId == environmentId)
        {
            throw ThrowHelper.EnvironmentCycleDetected(Array.Empty<string>());
        }

        if (environment is null)
        {
            throw ThrowHelper.EnvironmentWasNotFound(environmentId);
        }

        if (parent is null)
        {
            throw ThrowHelper.EnvironmentWasNotFound(parentId);
        }

        await EnsureNoCycleAsync(environment, parent, cancellationToken);

        environment = environment with { ParentId = parent.Id };

        return await _store.UpdateAsync(environment, cancellationToken);
    }

    private async Task EnsureNoCycleAsync(
        Environment environment,
        Environment parent,
        CancellationToken cancellationToken)
    {
        HashSet<Guid> visited = new() { environment.Id, parent.Id };
        List<string> path = new() { environment.Name, parent.Name };
        Environment? next = parent;

        while (next is { ParentId: { } nextParent } &&
               !cancellationToken.IsCancellationRequested)
        {
            next = await _environmentByIdDataLoader
                .LoadAsync(nextParent, cancellationToken);

            if (next is null)
            {
                return;
            }

            path.Add(next.Name);

            if (!visited.Add(next.Id))
            {
                throw ThrowHelper.EnvironmentCycleDetected(path);
            }
        }
    }
}
