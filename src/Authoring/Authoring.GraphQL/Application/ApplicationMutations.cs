using System.Collections.Generic;
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
    }

    public class UpdateApplicationPayload : Payload
    {
        public Application? Application { get; }

        public UpdateApplicationPayload(Application application)
        {
            Application = application;
        }

        public UpdateApplicationPayload(
            IReadOnlyList<UserError>? errors = null)
            : base(errors)
        {
        }
    }

    public abstract class Payload
    {
        protected Payload(IReadOnlyList<UserError>? errors = null)
        {
            Errors = errors;
        }

        public IReadOnlyList<UserError>? Errors { get; }
    }

    public record UserError(string Message, string Code);


}
