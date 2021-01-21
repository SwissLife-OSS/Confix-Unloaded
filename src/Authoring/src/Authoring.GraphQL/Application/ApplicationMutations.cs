using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
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
                        input,
                        cancellationToken);
                return new AddApplicationPayload(application);
            }
            catch // TODO : duplicate name exception or something like this
            {
                return new AddApplicationPayload(new ApplicationNameTakenError(input.Name));
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
