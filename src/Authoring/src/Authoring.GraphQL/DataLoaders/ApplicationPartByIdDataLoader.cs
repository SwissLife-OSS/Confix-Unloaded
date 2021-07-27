using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate.Fetching;

namespace Confix.Authoring.GraphQL.DataLoaders
{
    public class ApplicationPartByIdDataLoader : BatchDataLoader<Guid, ApplicationPart?>
    {
        private readonly IApplicationService _applicationService;

        public ApplicationPartByIdDataLoader(
            IApplicationService applicationService,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _applicationService = applicationService;
        }

        protected override async Task<IReadOnlyDictionary<Guid, ApplicationPart?>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            IEnumerable<ApplicationPart>? parts =
                await _applicationService.GetManyPartsByIdAsync(
                    keys,
                    cancellationToken);

            return parts.ToDictionary(x => x.Id)!;
        }
    }
}
