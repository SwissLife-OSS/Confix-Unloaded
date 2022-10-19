using Confix.Authoring.Store;
using Confix.Common.Exceptions;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(OperationTypeNames.Mutation)]
public sealed class ApplicationMutations
{
    /// <summary>
    ///     Creates a new application configuration.
    /// </summary>
    [Error(typeof(ApplicationNameTaken))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Application> CreateApplicationAsync(
        [Service] IApplicationService applicationService,
        string name,
        string @namespace,
        IReadOnlyList<string>? parts = null,
        CancellationToken cancellationToken = default)
    {
        return await applicationService.CreateAsync(name, @namespace, parts, cancellationToken);
    }

    /// <summary>
    ///     Renames an application configuration.
    /// </summary>
    [Error(typeof(ApplicationIdInvalid))]
    [Error(typeof(ApplicationNameTaken))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Application> RenameApplicationAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(Application))] Guid id,
        string name,
        CancellationToken cancellationToken)
    {
        return await applicationService.RenameAsync(id, name, cancellationToken);
    }

    /// <summary>
    ///     Renames an application part of an application configuration.
    /// </summary>
    [Error(typeof(ApplicationIdInvalid))]
    [Error(typeof(ApplicationPartIdInvalid))]
    [Error(typeof(ApplicationPartNameTaken))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApplicationPart> RenameApplicationPartAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPart))] Guid applicationPartId,
        string name,
        CancellationToken cancellationToken)
    {
        return await applicationService.RenamePartAsync(applicationPartId, name, cancellationToken);
    }

    /// <summary>
    ///     Adds a component to an application part.
    /// </summary>
    [Error(typeof(ApplicationPartIdInvalid))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApplicationPart> AddComponentsToApplicationPartAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPart))] Guid applicationPartId,
        [ID(nameof(Component))] IReadOnlyList<Guid> componentIds,
        CancellationToken cancellationToken)
    {
        return await applicationService
            .AddComponentsToPartAsync(applicationPartId, componentIds, cancellationToken);
    }

    /// <summary>
    ///     Adds a component to an application part.
    /// </summary>
    [Error(typeof(ApplicationNotFoundError))]
    [Error(typeof(ApplicationPartNameTaken))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Application> AddPartToApplicationAsync(
        [Service] IApplicationService applicationService,
        string partName,
        [ID(nameof(Application))] Guid applicationId,
        CancellationToken cancellationToken)
    {
        return await applicationService
            .AddPartToApplicationAsync(applicationId, partName, cancellationToken);
    }

    /// <summary>
    ///     Adds a component to an application part.
    /// </summary>
    [Error(typeof(ApplicationPartNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<Application> RemoveApplicationPartAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPart))] Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        return await applicationService.RemovePartAsync(applicationPartId, cancellationToken);
    }

    /// <summary>
    ///     Adds a component to an application part.
    /// </summary>
    [Error(typeof(ApplicationPartNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    public async Task<ApplicationPart> RemoveComponentFromApplicationPartAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
        CancellationToken cancellationToken)
    {
        return await applicationService
            .RemoveComponentFromApplicationPartAsync(partComponentId, cancellationToken);
    }

    /// <summary>
    ///     Adds a component to an application part.
    /// </summary>
    [Error(typeof(ApplicationPartComponentNotFoundError))]
    [Error(typeof(ComponentNotFoundError))]
    [Error(typeof(UnauthorizedOperationException))]
    [UseMutationConvention(PayloadFieldName = "component")]
    public async Task<ApplicationPartComponent> UpdateApplicationPartComponentValuesAsync(
        [Service] IApplicationService applicationService,
        [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
        [GraphQLType(typeof(AnyType))] IDictionary<string, object?> values,
        CancellationToken cancellationToken)
    {
        return await applicationService
            .SetApplicationPartComponentValues(partComponentId, values, cancellationToken);
    }
}
