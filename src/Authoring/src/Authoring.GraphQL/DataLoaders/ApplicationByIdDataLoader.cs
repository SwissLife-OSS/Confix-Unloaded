using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate.DataLoader;

namespace Confix.Authoring.GraphQL.DataLoaders
{
    public class ApplicationByIdDataLoader : BatchDataLoader<Guid, Application?>
    {
        private readonly IApplicationService _applicationService;

        public ApplicationByIdDataLoader(
            IApplicationService applicationService,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _applicationService = applicationService;
        }

        protected override async Task<IReadOnlyDictionary<Guid, Application?>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            IEnumerable<Application> applications =
                await _applicationService.GetManyByIdAsync(
                    keys,
                    cancellationToken);

            return applications.ToDictionary(x => x.Id)!;
        }
    }
}
