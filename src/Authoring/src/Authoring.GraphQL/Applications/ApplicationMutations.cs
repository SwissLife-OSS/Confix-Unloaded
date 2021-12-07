using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ApplicationMutations
    {
        private readonly IApplicationService _applicationService;

        public ApplicationMutations(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        /// <summary>
        /// Creates a new application configuration.
        /// </summary>
        [Error(typeof(ApplicationNameTaken))]
        public async Task<CreateApplicationPayload> CreateApplicationAsync(
            CreateApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application =
                await _applicationService.CreateAsync(
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
            RenameApplicationInput input,
            CancellationToken cancellationToken)
        {
            await _applicationService.RenameAsync(
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
            RenameApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            await _applicationService.RenamePartAsync(
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
            AddComponentsToApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationService
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
            AddPartToApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationService.AddPartToApplicationAsync(
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
            RemoveApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationService
                .RemovePartAsync(input.ApplicationPartId, cancellationToken);

            return new RemoveApplicationPartPayload(application);
        }

        /// <summary>
        /// Adds a component to an application part.
        /// </summary>
        [Error(typeof(ApplicationPartNotFoundError))]
        public async Task<RemoveComponentFromApplicationPartPayload>
            RemoveComponentFromApplicationPartAsync(
            RemoveComponentFromApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPart applicationPart = await _applicationService
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
            UpdateApplicationPartComponentValuesInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPartComponent component = await _applicationService
                .SetApplicationPartComponentValues(
                    input.PartComponentId,
                    input.Values,
                    cancellationToken);

            return new UpdateApplicationPartComponentValuesPayload(component);
        }
    }
}
