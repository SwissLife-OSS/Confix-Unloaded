using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Types
{
    public class ApplicationType : ObjectType<Application>
    {
        protected override void Configure(IObjectTypeDescriptor<Application> descriptor)
        {
            descriptor
                .ImplementsNode()
                .ResolveNodeWith<Resolvers>(c => c.GetApplication(default!, default!, default));
        }

        private class Resolvers
        {
            public Task<Application?> GetApplication(
                Guid id,
                ApplicationByIdDataLoader applicationById,
                CancellationToken cancellationToken) {

                return applicationById.LoadAsync(id, cancellationToken)!;
            }
        }
    }
}
