using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.DataLoaders
{
    public class ApplicationByIdDataLoader : BatchDataLoader<Guid, Application?>
    {
        private readonly IApplicationStore _applicationStore;

        public ApplicationByIdDataLoader(
            IApplicationStore applicationStore,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _applicationStore = applicationStore;
        }

        protected override async Task<IReadOnlyDictionary<Guid, Application?>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            IEnumerable<Application> applications =
                await _applicationStore.GetManyByIdAsync(
                    keys,
                    cancellationToken);

            return applications.ToDictionary(x => x.Id)!;
        }
    }
}
