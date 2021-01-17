using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Query")]
    public class ApplicationQueries
    {
        private readonly IApplicationService _applicationService;

        public ApplicationQueries(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        public async Task<IEnumerable<Application>> GetApplicationsAsync(
            CancellationToken cancellationToken)
        {
            return await _applicationService.GetAllAsync(cancellationToken);
        }
    }
}
