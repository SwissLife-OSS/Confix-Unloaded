using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public class EnvironmentMutations
{
    private readonly IEnvironmentService _environmentService;

    public EnvironmentMutations(IEnvironmentService environmentService)
    {
        _environmentService = environmentService;
    }

    public async Task<CreateEnvironmentPayload> CreateEnvironmentAsync(
        CreateEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        Environment environment = await _environmentService.CreateAsync(
            input.Name,
            cancellationToken);

        return new CreateEnvironmentPayload(environment);
    }

    public async Task<RenameEnvironmentPayload> RenameEnvironmentAsync(
        RenameEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        var value = await _environmentService.RenameAsync(
            input.Id,
            input.Name,
            cancellationToken);

        return new RenameEnvironmentPayload(value);
    }

    public async Task<DeleteEnvironmentPayload> DeleteEnvironmentByIdAsync(
        DeleteEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        Environment? environment =
            await _environmentService.DeleteById(input.Id, cancellationToken);

        return new DeleteEnvironmentPayload(input.Id, environment);
    }
}
