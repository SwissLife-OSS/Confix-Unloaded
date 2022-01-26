using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Publishing;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

public class EnvironmentService : IEnvironmentService
{
    private readonly IEnvironmentStore _store;
    private readonly IDataLoader<Guid, Environment?> _environmentByIdDataLoader;

    public EnvironmentService(
        IEnvironmentStore store,
        IDataLoader<Guid, Environment?> environmentByIdDataLoader)
    {
        _store = store;
        _environmentByIdDataLoader = environmentByIdDataLoader;
    }

    public async Task<IReadOnlyList<Environment>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken = default)
    {
        IReadOnlyList<Environment?> envs =
            await _environmentByIdDataLoader.LoadAsync(ids.ToArray(), cancellationToken);

        return envs.OfType<Environment>().ToArray();
    }

    public Task<Environment?> GetByIdAsync(
        Guid environmentId,
        CancellationToken cancellationToken = default) =>
        _environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken);

    public Task<Environment?> GetByNameAsync(
        string name,
        CancellationToken cancellationToken = default)
        => _store.GetByNameAsync(name, cancellationToken);

    public Task<IReadOnlyCollection<Environment>> GetManyByIdAsync(
        IEnumerable<Guid> environmentIds,
        CancellationToken cancellationToken = default) =>
        _store.GetManyByIdAsync(environmentIds, cancellationToken);

    public async Task<Environment> CreateAsync(
        string name,
        CancellationToken cancellationToken = default)
    {
        Environment environment = new(Guid.NewGuid(), name);

        await _store.AddAsync(environment, cancellationToken);

        return environment;
    }

    public async Task<Environment> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default) =>
        await _store.RenameAsync(environmentId, name, cancellationToken) ??
        throw new EnvironmentNotFoundException(environmentId);

    public async Task<Environment> DeleteById(
        Guid environmentId,
        CancellationToken cancellationToken) =>
        await _store.RemoveByIdAsync(environmentId, cancellationToken) ??
        throw new EnvironmentNotFoundException(environmentId);

    public IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default)
    {
        return _store.SearchAsync(search, cancellationToken);
    }

    public async Task<Environment> SetParent(
        Guid environmentId,
        Guid parentId,
        CancellationToken cancellationToken = default)
    {
        if (parentId == environmentId)
        {
            throw ThrowHelper.EnvironmentCycleDetected(Array.Empty<string>());
        }

        Task<Environment?> environementFetch =
            _store.GetByIdAsync(environmentId, cancellationToken);
        Task<Environment?> parentFetch =
            _store.GetByIdAsync(parentId, cancellationToken);

        Environment? environement = await environementFetch;
        Environment? parent = await parentFetch;

        if (environement is null)
        {
            throw ThrowHelper.EnvironmentWasNotFound(environmentId);
        }

        if (parent is null)
        {
            throw ThrowHelper.EnvironmentWasNotFound(parentId);
        }

        await EnsureNoCycleAsync(environement, parent, cancellationToken);

        environement = environement with { ParentId = parent.Id };

        return await _store.UpdateAsync(environement, cancellationToken);
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
