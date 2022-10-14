using Confix.Authentication.Authorization;
using Confix.Authoring.Groups;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

public class GroupByIdDataLoader
    : BatchDataLoader<Guid, Group?>
    , IGroupByIdDataLoader
{
    private readonly IGroupStore _applicationStore;

    public GroupByIdDataLoader(
        IGroupStore applicationStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _applicationStore = applicationStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Group?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        IEnumerable<Group> applications =
            await _applicationStore.GetByIdsAsync(keys, cancellationToken);

        return applications.ToDictionary(x => x.Id)!;
    }
}
