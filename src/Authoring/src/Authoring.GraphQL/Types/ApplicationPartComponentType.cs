using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Types
{
    public class ApplicationPartComponentType : ObjectType<ApplicationPartComponent>
    {
        protected override void Configure(
            IObjectTypeDescriptor<ApplicationPartComponent> descriptor)
        {
            descriptor
                .Ignore(x => x.ComponentId)
                .Field<Resolvers>(t => t.GetComponentAsync(default!, default!, default));
        }

        private class Resolvers
        {
            public async Task<Component> GetComponentAsync(
                ApplicationPartComponent partComponent,
                ComponentByIdDataLoader componentById,
                CancellationToken cancellationToken) =>
                (await componentById.LoadAsync(partComponent.ComponentId, cancellationToken))!;
        }
    }
}
