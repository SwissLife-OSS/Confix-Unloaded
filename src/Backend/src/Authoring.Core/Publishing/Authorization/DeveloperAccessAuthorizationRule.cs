using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing.Authorization;

internal sealed class DeveloperAccessAuthorizationRule : AuthorizationRule<DeveloperAccessRequest>
{
    private readonly IAuthorizationService _authorizationService;

    public DeveloperAccessAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService)
        : base(accessor)
    {
        _authorizationService = authorizationService;
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        DeveloperAccessRequest resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & Permissions.Claim) == 0)
        {
            return new ValueTask<bool>(false);
        }

        if (resource.Environment.AllowDeveloperAccess == false)
        {
            return new ValueTask<bool>(false);
        }

        return _authorizationService
            .RuleFor<Application>()
            .IsAuthorizedAsync(resource.Application, permissions, cancellationToken);
    }

    protected override ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(false);
    }
}
