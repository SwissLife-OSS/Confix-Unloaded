using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders;

internal sealed class VariableByIdDataLoader : BatchDataLoader<Guid, Variable?>, IVariableDataLoader
{
    private readonly IVariableStore _variableStore;

    public VariableByIdDataLoader(
        IVariableStore variableStore,
        IBatchScheduler batchScheduler,
        DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        _variableStore = variableStore;
    }

    protected override async Task<IReadOnlyDictionary<Guid, Variable?>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken)
    {
        var variables = await _variableStore.GetManyAsync(keys, cancellationToken);

        return variables.ToDictionary(x => x!.Id);
    }
}
