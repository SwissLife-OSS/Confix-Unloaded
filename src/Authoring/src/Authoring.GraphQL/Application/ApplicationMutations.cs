using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(RootTypes.Mutation)]
    public class ApplicationMutations
    {
        private readonly IApplicationService _applicationService;

        public ApplicationMutations(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        public async Task<CreateApplicationPayload> CreateApplicationAsync(
            CreateApplicationInput input,
            CancellationToken cancellationToken)
        {
            try
            {
                Application application =
                    await _applicationService.AddAsync(
                        new AddApplicationRequest(input.Name, input.Parts),
                        cancellationToken);
                return new CreateApplicationPayload(application);
            }
            catch // TODO : duplicate name exception or something like this
            {
                return new CreateApplicationPayload(new ApplicationNameTaken(input.Name));
            }
        }

        public async Task<RenameApplicationPayload> RenameApplicationAsync(
            RenameApplicationInput input,
            CancellationToken cancellationToken)
        {
            try
            {
                Application application =
                    await _applicationService.RenameAsync(
                        new RenameApplicationRequest(input.Id, input.Name),
                        cancellationToken);
                return new RenameApplicationPayload(application);
            }
            catch(EntityIdInvalidException)
            {
                return new RenameApplicationPayload(
                    new ApplicationIdInvalid(input.Id));
            }
            catch // TODO : duplicate name exception or something like this
            {
                return new RenameApplicationPayload(new ApplicationNameTaken(input.Name));
            }
        }

        public async Task<RenameApplicationPartPayload> RenameApplicationPartAsync(
            RenameApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            try
            {
                ApplicationPart applicationPart =
                    await _applicationService.UpdateApplicationPartAsync(
                        new UpdateApplicationPartRequest(input.ApplicationId,
                            input.Id) {Name = input.Name},
                        cancellationToken);

                return new RenameApplicationPartPayload(applicationPart);
            }
            catch(EntityIdInvalidException ex)
            {
                if (ex.EntityName == nameof(Application))
                {
                    return new RenameApplicationPartPayload(
                        new ApplicationIdInvalid(input.ApplicationId));
                }

                return new RenameApplicationPartPayload(
                    new ApplicationPartIdInvalid(input.Id));
            }
        }

        public async Task<AddComponentsToApplicationPartPayload> AddComponentsToApplicationPartAsync(
            AddComponentsToApplicationPartInput input,
            CancellationToken cancellationToken)
        {
            try
            {
                ApplicationPart applicationPart =
                    await _applicationService.UpdateApplicationPartAsync(
                        new UpdateApplicationPartRequest(input.ApplicationId,
                            input.Id) {Components = input.ComponentIds},
                        cancellationToken);

                return new AddComponentsToApplicationPartPayload(applicationPart);
            }
            catch(EntityIdInvalidException ex)
            {
                if (ex.EntityName == nameof(Application))
                {
                    return new AddComponentsToApplicationPartPayload(
                        new ApplicationIdInvalid(input.ApplicationId));
                }

                return new AddComponentsToApplicationPartPayload(
                    new ApplicationPartIdInvalid(input.Id));
            }
        }
    }
}
