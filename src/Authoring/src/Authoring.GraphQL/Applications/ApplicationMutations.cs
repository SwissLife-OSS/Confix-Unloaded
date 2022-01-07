using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ApplicationMutations
    {
        /// <summary>
        /// Creates a new application configuration.
        /// </summary>
        [Error(typeof(ApplicationNameTaken))]
        public async Task<Application> CreateApplicationAsync(
            [Service] IApplicationService applicationService,
            string name,
            string? @namespace,
            IReadOnlyList<string>? parts = null,
            CancellationToken cancellationToken = default)
            => await applicationService.CreateAsync(name, @namespace, parts, cancellationToken);

        /// <summary>
        /// Renames an application configuration.
        /// </summary>
        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationNameTaken))]
        public async Task<Application> RenameApplicationAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(Application))] Guid id,
            string name,
            CancellationToken cancellationToken)
            => await applicationService.RenameAsync(id, name, cancellationToken);

        /// <summary>
        /// Renames an application part of an application configuration.
        /// </summary>
        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationPartIdInvalid))]
        [Error(typeof(ApplicationPartNameTaken))]
        public async Task<ApplicationPart> RenameApplicationPartAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(ApplicationPart))] Guid applicationPartId,
            string name,
            CancellationToken cancellationToken)
            => await applicationService.RenamePartAsync(applicationPartId, name, cancellationToken);

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartIdInvalid))]
        public async Task<ApplicationPart> AddComponentsToApplicationPartAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(ApplicationPart))] Guid applicationPartId,
            [ID(nameof(Component))] IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken)
            => await applicationService
                .AddComponentsToPartAsync(applicationPartId, componentIds, cancellationToken);

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationNotFoundError))]
        [Error(typeof(ApplicationPartNameTaken))]
        public async Task<Application> AddPartToApplicationAsync(
            [Service] IApplicationService applicationService,
            string partName,
            [ID(nameof(Application))] Guid applicationId,
            CancellationToken cancellationToken)
            => await applicationService
                .AddPartToApplicationAsync(applicationId, partName, cancellationToken);

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartNotFoundError))]
        public async Task<Application> RemoveApplicationPartAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(ApplicationPart))] Guid applicationPartId,
            CancellationToken cancellationToken)
            => await applicationService.RemovePartAsync(applicationPartId, cancellationToken);

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartNotFoundError))]
        public async Task<ApplicationPart> RemoveComponentFromApplicationPartAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
            CancellationToken cancellationToken)
            => await applicationService
                .RemoveComponentFromApplicationPartAsync(partComponentId, cancellationToken);

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartComponentNotFoundError))]
        [Error(typeof(ComponentNotFoundError))]
        [UseMutationConvention(PayloadFieldName = "component")]
        public async Task<ApplicationPartComponent> UpdateApplicationPartComponentValuesAsync(
            [Service] IApplicationService applicationService,
            [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
            [GraphQLType(typeof(AnyType))] IDictionary<string, object?> values,
            CancellationToken cancellationToken)
            => await applicationService
                .SetApplicationPartComponentValues(partComponentId, values, cancellationToken);
    }
}
