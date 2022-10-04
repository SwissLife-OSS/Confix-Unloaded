using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Variables;

public class VariableAuthorizationRule : AuthorizationRule<Variable>
{
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;

    public VariableAuthorizationRule(
        ISessionAccessor accessor,
        IApplicationByPartIdDataLoader applicationByPartId) : base(accessor)
    {
        _applicationByPartId = applicationByPartId;
    }

    protected override ValueTask<bool> IsAuthorizedAsync(
        Variable resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return new ValueTask<bool>(
            session.HasPermission(resource.Namespace, Scope.Variable, permissions));
    }

    protected override async ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return resource switch
        {
            ApplicationPart r => await AuthorizeApplicationPart(r),
            Application r => await AuthorizeApplication(r),
            _ => false
        };

        async ValueTask<bool> AuthorizeApplicationPart(ApplicationPart part)
        {
            var application = await _applicationByPartId.LoadAsync(part.Id, cancellationToken);

            if (application is null)
            {
                return false;
            }

            return await AuthorizeApplication(application);
        }

        ValueTask<bool> AuthorizeApplication(Application app)
        {
            return new ValueTask<bool>(
                session.HasPermission(app.Namespace, Scope.Variable, permissions));
        }
    }
}
