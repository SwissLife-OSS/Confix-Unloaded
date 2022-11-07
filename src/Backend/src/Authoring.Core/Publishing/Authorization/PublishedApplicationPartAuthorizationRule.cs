using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing.Authorization;

internal sealed class PublishedApplicationPartAuthorizationRule
    : AuthorizationRule<PublishedApplicationPart>
{
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;
    private readonly IAuthorizationService _authorizationService;

    public PublishedApplicationPartAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService,
        IApplicationByPartIdDataLoader applicationByPartId) : base(accessor)
    {
        _authorizationService = authorizationService;
        _applicationByPartId = applicationByPartId;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        PublishedApplicationPart resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & Permissions.Read) == 0)
        {
            return false;
        }

        var application = await _applicationByPartId.LoadAsync(resource.Part.Id, cancellationToken);

        return await _authorizationService
            .RuleFor<Application>()
            .IsAuthorizedAsync(application, permissions, cancellationToken);
    }

    protected override async ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & Permissions.Read) == 0)
        {
            return false;
        }

        return resource switch
        {
            Application r => await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            ApplicationPart r => await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),
            _ => false
        };
    }
}
