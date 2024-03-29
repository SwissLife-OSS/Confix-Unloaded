using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(typeof(ApplicationPart))]
public sealed class ApplicationApplicationPartExtensions
{
    public Task<Application?> GetApplicationAsync(
        [Service] IApplicationService service,
        [Parent] ApplicationPart part) =>
        service.GetByPartIdAsync(part.Id);
}
