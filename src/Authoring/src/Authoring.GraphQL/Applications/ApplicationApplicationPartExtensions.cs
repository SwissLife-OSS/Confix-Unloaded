using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(typeof(ApplicationPart))]
    public class ApplicationApplicationPartExtensions
    {
        public Task<Application?> GetApplicationAsync(
            [Service] IApplicationService service,
            [Parent] ApplicationPart part) =>
            service.GetByPartIdAsync(part.Id);
    }
}
