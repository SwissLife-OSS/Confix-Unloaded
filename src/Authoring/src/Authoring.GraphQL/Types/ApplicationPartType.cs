using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Types
{
    public class ApplicationPartType : ObjectType<ApplicationPart>
    {
        protected override void Configure(IObjectTypeDescriptor<ApplicationPart> descriptor)
        {
            descriptor
                .Field(t => t.Id)
                .ID(nameof(ApplicationPart));

            descriptor
                .Field<Resolvers>(t => t.GetComponentsAsync(default!, default!, default));
        }

        private class Resolvers
        {
            public async Task<IEnumerable<Component>> GetComponentsAsync(
                ApplicationPart part,
                [Service] IComponentService componentService,
                CancellationToken cancellationToken)
            {
                return await componentService.GetManyAsync(
                    part.Components.Select(x => x.ComponentId),
                    cancellationToken);
            }
        }
    }
}
