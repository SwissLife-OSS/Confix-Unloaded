using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.Applications.Filters;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ApplicationQueries
    {
        private readonly IApplicationService _applicationService;

        public ApplicationQueries(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [UsePaging]
        [UseFiltering(typeof(ApplicationFilterInputType))]
        public IQueryable<Application> GetApplications() =>
            _applicationService.Query();

        public Task<Application?> GetApplicationByIdAsync(
            [ID(nameof(Application))] Guid id,
            ApplicationByIdDataLoader applicationById,
            CancellationToken cancellationToken) =>
            applicationById.LoadAsync(id, cancellationToken);

    }
}
