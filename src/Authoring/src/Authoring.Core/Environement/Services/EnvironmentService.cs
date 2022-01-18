using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

    public Task<Environment> DeleteById(Guid environmentId, CancellationToken cancellationToken) =>
        _store.RemoveByIdAsync(environmentId, cancellationToken) ??
        throw new EnvironmentNotFoundException(environmentId);

    public IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default)
    {
        return _store.SearchAsync(search, cancellationToken);
    }
}
