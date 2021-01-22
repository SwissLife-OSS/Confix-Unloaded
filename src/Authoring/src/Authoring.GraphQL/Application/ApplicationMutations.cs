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

        public async Task<AddApplicationPayload> AddApplicationAsync(
            AddApplicationInput input,
            CancellationToken cancellationToken)
        {
            try
            {
                Application application =
                    await _applicationService.AddAsync(
                        new Authoring.AddApplicationRequest(input.Name, input.Parts),
                        cancellationToken);
                return new AddApplicationPayload(application);
            }
            catch // TODO : duplicate name exception or something like this
            {
                return new AddApplicationPayload(new ApplicationNameTakenError(input.Name));
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
            catch // TODO : duplicate name exception or something like this
            {
                return new RenameApplicationPayload(new ApplicationNameTakenError(input.Name));
            }
        }

        public async Task<UpdateApplicationPayload> UpdatePartAsync(
            UpdateApplicationPartRequest input,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationService.UpdateApplicationPartAsync(
                input,
                cancellationToken);

            return new UpdateApplicationPayload(application);
        }
    }
}
