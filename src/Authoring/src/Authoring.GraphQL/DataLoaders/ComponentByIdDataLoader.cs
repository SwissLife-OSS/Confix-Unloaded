using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GreenDonut;
using HotChocolate.DataLoader;

namespace Confix.Authoring.GraphQL.DataLoaders
{
    public class ComponentByIdDataLoader : BatchDataLoader<Guid, Component?>
    {
        private readonly IComponentService _componentService;

        public ComponentByIdDataLoader(
            IComponentService componentService,
            IBatchScheduler batchScheduler)
            : base(batchScheduler)
        {
            _componentService = componentService;
        }

        protected override async Task<IReadOnlyDictionary<Guid, Component?>> LoadBatchAsync(
            IReadOnlyList<Guid> keys,
            CancellationToken cancellationToken)
        {
            IEnumerable<Component> components =
                await _componentService.GetManyAsync(
                    keys,
                    cancellationToken);

            return components.ToDictionary(x => x.Id)!;
        }
    }
}
