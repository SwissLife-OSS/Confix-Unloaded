using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring;

public class ApplicationPartAuthorizationRule : AuthorizationRule<ApplicationPart>
{
    private readonly IAuthorizationRule<Application> _applicationRule;
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;

    public ApplicationPartAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationRule<Application> applicationRule,
        IApplicationByPartIdDataLoader applicationByPartId) : base(accessor)
    {
        _applicationRule = applicationRule;
        _applicationByPartId = applicationByPartId;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        ApplicationPart resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return await _applicationRule.IsAuthorizedAsync(
            await _applicationByPartId.LoadAsync(resource.Id, cancellationToken),
            cancellationToken);
    }
}
