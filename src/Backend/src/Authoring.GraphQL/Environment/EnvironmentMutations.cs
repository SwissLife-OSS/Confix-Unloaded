using Confix.Authoring.GraphQL.Applications;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class EnvironmentMutations
{
    [Error(typeof(EnvironmentNameCollisionError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> CreateEnvironmentAsync(
        [Service] IEnvironmentService environmentService,
        string name,
        CancellationToken cancellationToken)
    {
        return await environmentService.CreateAsync(name, cancellationToken);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(EnvironmentNameCollisionError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> RenameEnvironmentAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        return await environmentService.RenameAsync(id, name, cancellationToken);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> RemoveEnvironmentByIdAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        CancellationToken cancellationToken)
    {
        return await environmentService.DeleteById(id, cancellationToken);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(EnvironmentCycleDetectedException))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> SetParentOfEnvironment(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid environmentId,
        [ID(nameof(Environment))] Guid parentId,
        CancellationToken cancellationToken)
    {
        return await environmentService.SetParent(environmentId, parentId, cancellationToken);
    }

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> SetDeveloperAccessOfEnvironment(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid environmentId,
        bool isAllowed,
        CancellationToken cancellationToken)
    {
        return await environmentService
            .SetAllowDeveloperAccess(environmentId, isAllowed, cancellationToken);
    }
}
