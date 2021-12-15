using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ApplicationMutations
    {
        /// <summary>
        /// Creates a new application configuration.
        /// </summary>
        [Error(typeof(ApplicationNameTaken))]
        public async Task<CreateApplicationPayload> CreateApplicationAsync(
            [Service] IApplicationService applicationService,
            CreateApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application =
                await applicationService.CreateAsync(
                    input.Name,
                    input.Namespace,
                    input.Parts,
                    cancellationToken);

            return new CreateApplicationPayload(application);
        }

        /// <summary>
        /// Renames an application configuration.
        /// </summary>
        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationNameTaken))]
        public async Task<RenameApplicationPayload> RenameApplicationAsync(
            [Service] IApplicationService applicationService,
            RenameApplicationInput input,
            CancellationToken cancellationToken)
        {
            await applicationService.RenameAsync(
                input.Id,
                input.Name,
                cancellationToken);

            return new RenameApplicationPayload(input.Id);
        }

        /// <summary>
        /// Renames an application part of an application configuration.
        /// </summary>
        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationPartIdInvalid))]
        [Error(typeof(ApplicationPartNameTaken))]
        public async Task<RenameApplicationPartPayload> RenameApplicationPartAsync(
            [Service] IApplicationService applicationService,
            RenameApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            await applicationService.RenamePartAsync(
                input.ApplicationPartId,
                input.Name,
                cancellationToken);

            return new RenameApplicationPartPayload(input.ApplicationPartId);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartIdInvalid))]
        public async Task<AddComponentsToApplicationPartPayload>
            AddComponentsToApplicationPartAsync(
            [Service] IApplicationService applicationService,
            AddComponentsToApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            Application application = await applicationService
                .AddComponentsToPartAsync(
                    input.ApplicationPartId,
                    input.ComponentIds,
                    cancellationToken);

            return new AddComponentsToApplicationPartPayload(application, input.ApplicationPartId);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationNotFoundError))]
        [Error(typeof(ApplicationPartNameTaken))]
        public async Task<AddPartToApplicationPayload> AddPartToApplicationAsync(
            [Service] IApplicationService applicationService,
            AddPartToApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application = await applicationService.AddPartToApplicationAsync(
                input.ApplicationId,
                input.PartName,
                cancellationToken);

            return new AddPartToApplicationPayload(application);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartNotFoundError))]
        public async Task<RemoveApplicationPartPayload> RemoveApplicationPartAsync(
            [Service] IApplicationService applicationService,
            RemoveApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            Application application = await applicationService
                .RemovePartAsync(input.ApplicationPartId, cancellationToken);

            return new RemoveApplicationPartPayload(application);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartNotFoundError))]
        public async Task<RemoveComponentFromApplicationPartPayload>
            RemoveComponentFromApplicationPartAsync(
            [Service] IApplicationService applicationService,
            RemoveComponentFromApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPart applicationPart = await applicationService
                .RemoveComponentFromApplicationPartAsync(
                    input.PartComponentId,
                    cancellationToken);

            return new RemoveComponentFromApplicationPartPayload(applicationPart);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartComponentNotFoundError))]
        [Error(typeof(ComponentNotFoundError))]
        public async Task<UpdateApplicationPartComponentValuesPayload>
            UpdateApplicationPartComponentValuesAsync(
            [Service] IApplicationService applicationService,
            UpdateApplicationPartComponentValuesInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPartComponent component = await applicationService
                .SetApplicationPartComponentValues(
                    input.PartComponentId,
                    input.Values,
                    cancellationToken);

            return new UpdateApplicationPartComponentValuesPayload(component);
        }
    }
}
