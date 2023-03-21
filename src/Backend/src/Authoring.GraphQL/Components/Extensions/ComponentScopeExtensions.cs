using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType<ComponentScope>]
public class ComponentScopeExtensions
{
    public async ValueTask<Application?> GetApplication(
        [Parent] ComponentScope scope,
        [Service] IApplicationService applicationService,
        CancellationToken cancellationToken)
    {
        if (scope.ApplicationId is not { } applicationId)
        {
            return null;
        }

        return await applicationService.GetByIdAsync(applicationId, cancellationToken);
    }

    public async ValueTask<ApplicationPart?> GetApplicationPart(
        [Parent] ComponentScope scope,
        [Service] IApplicationService applicationService,
        CancellationToken cancellationToken)
    {
        if (scope.ApplicationPartId is not { } applicationPartId)
        {
            return null;
        }

        return await applicationService.GetPartByIdAsync(applicationPartId, cancellationToken);
    }
}
