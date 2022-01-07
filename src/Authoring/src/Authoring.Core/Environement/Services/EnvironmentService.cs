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
    private readonly IEnvironmentStore _appStore;
    private readonly IDataLoader<Guid, Environment?> _environmentByIdDataLoader;

    public EnvironmentService(
        IEnvironmentStore appStore,
        IDataLoader<Guid, Environment?> environmentByIdDataLoader)
    {
        _appStore = appStore;
        _environmentByIdDataLoader = environmentByIdDataLoader;
    }

    public Task<Environment?> GetByIdAsync(
        Guid environmentId,
        CancellationToken cancellationToken = default) =>
        _environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken);

    public Task<IReadOnlyCollection<Environment>> GetManyByIdAsync(
        IEnumerable<Guid> environmentIds,
        CancellationToken cancellationToken = default) =>
        _appStore.GetManyByIdAsync(environmentIds, cancellationToken);

    public async Task<Environment> CreateAsync(
        string name,
        CancellationToken cancellationToken = default)
    {
        Environment environment = new(Guid.NewGuid(), name);

        await _appStore.AddAsync(environment, cancellationToken);

        return environment;
    }

    public Task<Environment?> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default) =>
        _appStore.RenameAsync(environmentId, name, cancellationToken);

    public Task<Environment?> DeleteById(Guid environmentId, CancellationToken cancellationToken)
    {
        return _appStore.RemoveByIdAsync(environmentId, cancellationToken);
    }

    public IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default)
    {
        return _appStore.SearchAsync(search, cancellationToken);
    }
}
