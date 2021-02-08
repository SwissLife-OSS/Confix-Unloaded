using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(RootTypes.Query)]
    public class ApplicationQueries
    {
        private readonly IApplicationService _applicationService;

        public ApplicationQueries(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        public Task<IEnumerable<Application>> GetApplicationsAsync(
            CancellationToken cancellationToken) =>
            _applicationService.GetAllAsync(cancellationToken);

        public Task<Application?> GetApplicationByIdAsync(
            [ID(nameof(Application))] Guid id,
            ApplicationByIdDataLoader applicationById,
            CancellationToken cancellationToken) =>
            applicationById.LoadAsync(id, cancellationToken);

    }
}
