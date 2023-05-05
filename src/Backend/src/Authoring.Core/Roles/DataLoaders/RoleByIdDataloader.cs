using Confix.Authentication.Authorization;
using GreenDonut;

namespace Confix.Authoring.Roles;

internal sealed class RoleByIdDataLoader : BatchDataLoader<Guid, Role?>, IRoleByIdDataLoader
{
    private readonly IRoleStore _store;

    public RoleByIdDataLoader(
        IBatchScheduler batchScheduler,
        IRoleStore store,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _store = store;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Role?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var roles = await _store.GetByIdsAsync(keys, cancellationToken);

        return roles.ToDictionary(x => x.Id)!;
    }
}
