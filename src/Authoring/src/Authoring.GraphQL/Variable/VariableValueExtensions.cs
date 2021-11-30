using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(typeof(VariableValue))]
public class VariableValueExtensions
{
    public async Task<Variable?> GetVariableAsync(
        [Service] IVariableService variableService,
        [Parent] VariableValue value,
        VariableByIdDataLoader variableById,
        CancellationToken cancellationToken)
    {
        return await variableById.LoadAsync(
            value.Key.VariableId,
            cancellationToken);
    }

    public async Task<Application?> GetApplicationAsync(
        [Parent] VariableValue value,
        [Service] IVariableService variableService,
        ApplicationByIdDataLoader applicationById,
        CancellationToken cancellationToken)
    {
        if (value.Key.ApplicationId.HasValue)
        {
            return await applicationById.LoadAsync(
                value.Key.ApplicationId.Value,
                cancellationToken);
        }

        return null;
    }

    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Parent] VariableValue value,
        [Service] IVariableService variableService,
        ApplicationPartByIdDataLoader applicationPartById,
        CancellationToken cancellationToken)
    {
        if (value.Key.PartId.HasValue)
        {
            return await applicationPartById.LoadAsync(
                value.Key.PartId.Value,
                cancellationToken);
        }

        return null;
    }

    public async Task<Environment?> GetEnvironmentAsync(
        [Parent] VariableValue value,
        EnvironmentByIdDataLoader environmentByIdDataLoader,
        CancellationToken cancellationToken)
    {
        if (value.Key.EnvironmentId.HasValue)
        {
            return await environmentByIdDataLoader.LoadAsync(
                value.Key.EnvironmentId.Value,
                cancellationToken);
        }

        return null;
    }
}
