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

    public async Task<UpdateEnvironmentPayload> CreateEnvironmentAsync(
        CreateEnvironmentInput input,
        CancellationToken cancellationToken)
    {
        Environment environment = await _environmentService.CreateAsync(
            new CreateEnvironmentRequest(input.Name, input.IsSecret)
            {
                DefaultValue = input.DefaultValue,
                Namespace = input.Namespace
            },
            cancellationToken);

        return new UpdateEnvironmentPayload(environment);
    }

    public async Task<UpdateEnvironmentValuePayload> SaveEnvironmentValueAsync(
        SaveEnvironmentValueInput input,
        CancellationToken cancellationToken)
    {
        EnvironmentValue value = await _environmentService.SaveValueAsync(
            new SaveEnvironmentValueRequest(input.EnvironmentId, input.Value)
            {
                ApplicationId = input.ApplicationId,
                PartId = input.PartId,
                ValueId = input.ValueId,
                EnvironmentId = input.EnvironmentId
            },
            cancellationToken);

        return new UpdateEnvironmentValuePayload(value);
    }

    public async Task<DeleteEnvironmentValuePayload> DeleteEnvironmentValueAsync(
        DeleteEnvironmentValueInput input,
        CancellationToken cancellationToken)
    {
        Environment environment = await _environmentService.DeleteValueAsync(input.id, cancellationToken);

        return new DeleteEnvironmentValuePayload(input.id, environment);
    }
}
