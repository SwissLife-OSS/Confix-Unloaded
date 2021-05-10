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

        [Error(typeof(ApplicationNameTaken))]
        public async Task<CreateApplicationPayload> CreateApplicationAsync(
            CreateApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application =
                await _applicationService.AddAsync(
                    new AddApplicationRequest(input.Name, input.Namespace, input.Parts),
                    cancellationToken);

            return new CreateApplicationPayload(application);
        }

        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationNameTaken))]
        public async Task<RenameApplicationPayload> RenameApplicationAsync(
            RenameApplicationInput input,
            CancellationToken cancellationToken)
        {
            Application application =
                await _applicationService.RenameAsync(
                    new RenameApplicationRequest(input.Id, input.Name),
                    cancellationToken);
            return new RenameApplicationPayload(application);
        }

        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationPartIdInvalid))]
        [Error(typeof(ApplicationPartNameTaken))]
        public async Task<RenameApplicationPartPayload> RenameApplicationPartAsync(
            RenameApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPart applicationPart =
                await _applicationService.UpdateApplicationPartAsync(
                    new UpdateApplicationPartRequest(input.ApplicationId,
                        input.Id)
                    { Name = input.Name },
                    cancellationToken);

            return new RenameApplicationPartPayload(applicationPart);
        }

        [Error(typeof(ApplicationIdInvalid))]
        [Error(typeof(ApplicationPartIdInvalid))]
        public async Task<AddComponentsToApplicationPartPayload> AddComponentsToApplicationPartAsync(
            AddComponentsToApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            ApplicationPart applicationPart =
                await _applicationService.UpdateApplicationPartAsync(
                    new UpdateApplicationPartRequest(input.ApplicationId, input.PartId)
                    {
                        Components = input.ComponentIds,
                    },
                    cancellationToken);

            Application application =
                await _applicationService.GetByIdAsync(
                    input.ApplicationId,
                    cancellationToken);

            return new AddComponentsToApplicationPartPayload(applicationPart, application);
        }
    }
}
