using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

internal sealed class ApplicationPartAuthorizationRule : AuthorizationRule<ApplicationPart>
{
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;
    private readonly IAuthorizationService _authorizationService;

    public ApplicationPartAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService,
        IApplicationByPartIdDataLoader applicationByPartId) : base(accessor)
    {
        _authorizationService = authorizationService;
        _applicationByPartId = applicationByPartId;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        ApplicationPart resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & (Read | Write | Publish | Claim)) == 0)
        {
            return false;
        }

        var application = await _applicationByPartId.LoadAsync(resource.Id, cancellationToken);

        return await _authorizationService.RuleFor<Application>()
            .IsAuthorizedAsync(application, permissions, cancellationToken);
    }

    protected override async ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & (Read | Write | Publish | Claim)) == 0)
        {
            return false;
        }

        return resource switch
        {
            Application app => await _authorizationService
            .RuleFor<Application>()
                .IsAuthorizedAsync(app, permissions, cancellationToken),

            _ => false
        };
    }
}
