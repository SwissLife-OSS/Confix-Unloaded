using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Mutation")]
    public class ApplicationMutations
    {
        private readonly IApplicationService _applicationService;

        public ApplicationMutations(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [GraphQLName("Application_Add")]
        public async Task<UpdateApplicationPayload> AddAsync(
            AddApplicationRequest input,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationService.AddAsync(
                input,
                cancellationToken);

            //TODO: handle error cases (Allready exists etc.)

            return new UpdateApplicationPayload(application);
        }

        [GraphQLName("ApplicationPart_Update")]
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
