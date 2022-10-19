using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.Applications;
using Confix.Common.Exceptions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

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
        => await environmentService.CreateAsync(name, cancellationToken);

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(EnvironmentNameCollisionError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> RenameEnvironmentAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        string name,
        CancellationToken cancellationToken)
        => await environmentService.RenameAsync(id, name, cancellationToken);

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> RemoveEnvironmentByIdAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        CancellationToken cancellationToken)
        => await environmentService.DeleteById(id, cancellationToken);

    [Error(typeof(EnvironmentNotFoundError))]
    [Error(typeof(EnvironmentCycleDetectedException))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Environment> SetParentOfEnvironment(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid environmentId,
        [ID(nameof(Environment))] Guid parentId,
        CancellationToken cancellationToken)
        => await environmentService.SetParent(environmentId, parentId, cancellationToken);
}
