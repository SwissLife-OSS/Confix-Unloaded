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
        => await variableById.LoadAsync(value.Key.VariableId, cancellationToken);

    public async Task<Application?> GetApplicationAsync(
        [Parent] VariableValue value,
        [Service] IVariableService variableService,
        IApplicationDataLoader applicationById,
        CancellationToken cancellationToken)
        => value.Key.ApplicationId is { } applicationId
            ? await applicationById.LoadAsync(applicationId, cancellationToken)
            : null;

    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Parent] VariableValue value,
        [Service] IVariableService variableService,
        IApplicationPartDataLoader applicationPartById,
        CancellationToken cancellationToken)
        => value.Key.PartId is { } partId
            ? await applicationPartById.LoadAsync(partId, cancellationToken)
            : null;

    public async Task<Environment?> GetEnvironmentAsync(
        [Parent] VariableValue value,
        EnvironmentByIdDataLoader environmentByIdDataLoader,
        CancellationToken cancellationToken)
        => value.Key.EnvironmentId is { } environmentId
            ? await environmentByIdDataLoader.LoadAsync(environmentId, cancellationToken)
            : null;
}
