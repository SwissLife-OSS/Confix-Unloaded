using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL;

[ExtendObjectType<ApplicationComponentScope>]
public class ApplicationComponentScopeExtensions
{
    public async ValueTask<Application?> GetApplication(
        [Parent] ApplicationComponentScope scope,
        [Service] IApplicationService applicationService,
        CancellationToken cancellationToken)
    => await applicationService.GetByIdAsync(scope.ApplicationId, cancellationToken);
}

[ExtendObjectType<ApplicationPartComponentScope>]
public class ApplicationPartComponentScopeExtensions
{
    public async ValueTask<ApplicationPart?> GetApplicationPart(
        [Parent] ApplicationPartComponentScope scope,
        [Service] IApplicationService applicationService,
        CancellationToken cancellationToken)
    => await applicationService.GetPartByIdAsync(scope.ApplicationPartId, cancellationToken);
}
