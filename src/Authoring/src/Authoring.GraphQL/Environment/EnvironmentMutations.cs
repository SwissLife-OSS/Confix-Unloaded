using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.Applications;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class EnvironmentMutations
{
    [Error(typeof(EnvironmentNameCollisionError))]
    public async Task<CreateEnvironmentPayload> CreateEnvironmentAsync(
        [Service] IEnvironmentService environmentService,
        CreateEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        Environment environment = await environmentService.CreateAsync(
            input.Name,
            cancellationToken);

        return new CreateEnvironmentPayload(environment);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(EnvironmentNameCollisionError))]
    public async Task<RenameEnvironmentPayload> RenameEnvironmentAsync(
        [Service] IEnvironmentService environmentService,
        RenameEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        var value = await environmentService.RenameAsync(
            input.Id,
            input.Name,
            cancellationToken);

        return new RenameEnvironmentPayload(value);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    public async Task<RemoveEnvironmentPayload> RemoveEnvironmentByIdAsync(
        [Service] IEnvironmentService environmentService,
        RemoveEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        Environment? environment =
            await environmentService.DeleteById(input.Id, cancellationToken);

        return new RemoveEnvironmentPayload(input.Id, environment);
    }
}
