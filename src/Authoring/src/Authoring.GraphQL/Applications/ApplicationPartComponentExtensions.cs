using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(typeof(ApplicationPartComponent))]
public class ApplicationPartComponentExtensions
{
    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Service] IApplicationStore store,
        [Parent] ApplicationPartComponent partComponent,
        CancellationToken cancellationToken)
    {
        Application? application =
            await store.GetByComponentPartIdAsync(partComponent.Id, cancellationToken);
        return application?.Parts
            .FirstOrDefault(x => x.Components.Any(y => y.Id == partComponent.Id));
    }
}
