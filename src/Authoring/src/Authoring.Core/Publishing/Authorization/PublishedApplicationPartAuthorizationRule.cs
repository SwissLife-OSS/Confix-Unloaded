using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring.Publishing.Authorization;

public class PublishedApplicationPartAuthorizationRule : AuthorizationRule<PublishedApplicationPart>
{
    private readonly IAuthorizationService _authorizationService;

    public PublishedApplicationPartAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService) : base(accessor)
    {
        _authorizationService = authorizationService;
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        PublishedApplicationPart resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return _authorizationService
            .IsAuthorized<ApplicationPart>(resource.Part.Id, cancellationToken);
    }
}
