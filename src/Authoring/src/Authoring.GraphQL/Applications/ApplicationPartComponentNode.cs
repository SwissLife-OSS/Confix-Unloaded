using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(typeof(ApplicationPartComponent))]
    public class ApplicationPartComponentNode
    {
        [BindMember(nameof(ApplicationPartComponent.ComponentId))]
        public async Task<Component> GetDefinitionAsync(
            [Parent] ApplicationPartComponent applicationPartComponent,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken) =>
            (await componentById.LoadAsync(
                applicationPartComponent.ComponentId,
                cancellationToken))!;
    }
}
