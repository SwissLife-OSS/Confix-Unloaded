using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.Store
{
    public class ApplicationType : ObjectType<Application>
    {
        protected override void Configure(IObjectTypeDescriptor<Application> descriptor)
        {
            descriptor
                .ImplementsNode()
                .ResolveNodeWith<Resolver>(c => c.GetApplication(default!, default, default));
        }

        private class Resolver
        {
            public Task<Application?> GetApplication(
                Guid id,
                ApplicationByIdDataLoader applicationById,
                CancellationToken cancellationToken) =>
                applicationById.LoadAsync(id, cancellationToken)!;
        }
    }
}
