using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

internal sealed class ApplicationPartComponentAuthorizationRule : AuthorizationRule<ApplicationPartComponent>
{
    private readonly IApplicationByComponentIdDataLoader _appByComponentId;

    public ApplicationPartComponentAuthorizationRule(
        ISessionAccessor accessor,
        IApplicationByComponentIdDataLoader appByComponentId) : base(accessor)
    {
        _appByComponentId = appByComponentId;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        ApplicationPartComponent resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        var application = await _appByComponentId.LoadAsync(resource.Id, cancellationToken);
        if (application is null)
        {
            return false;
        }

        return session.HasPermission(application.Namespace, Scope.Configuration, permissions);
    }

    protected override ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        if ((permissions & (Read | Write)) == 0)
        {
            return new ValueTask<bool>(false);
        }

        return resource switch
        {
            Application app => new ValueTask<bool>(HandleApplication(app)),
            _ => new ValueTask<bool>(false)
        };

        bool HandleApplication(Application application)
        {
            return session.HasPermission(application.Namespace, Scope.Configuration, permissions);
        }
    }
}
