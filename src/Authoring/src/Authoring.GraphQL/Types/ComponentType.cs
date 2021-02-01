using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Types
{
    public class ComponentType : ObjectType<Component>
    {
        protected override void Configure(
            IObjectTypeDescriptor<Component> descriptor)
        {
            descriptor
                .ImplementsNode()
                .ResolveNodeWith<Resolvers>(t => t.GetComponentById(default, default!, default));
        }

        private class Resolvers
        {
            public Task<Component?> GetComponentById(
                Guid id,
                ComponentByIdDataLoader componentById,
                CancellationToken cancellationToken) =>
                componentById.LoadAsync(id, cancellationToken);
        }
    }
}
