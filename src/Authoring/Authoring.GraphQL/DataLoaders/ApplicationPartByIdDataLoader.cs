using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate.DataLoader;

namespace Confix.Authoring.GraphQL.DataLoaders
{
    public class ApplicationPartByIdDataLoader : BatchDataLoader<Guid, ApplicationPart>
    {
        private readonly IApplicationService _applicationService;

        public ApplicationPartByIdDataLoader(
            IApplicationService applicationService,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _applicationService = applicationService;
        }

        protected override Task<IReadOnlyDictionary<Guid, ApplicationPart>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
