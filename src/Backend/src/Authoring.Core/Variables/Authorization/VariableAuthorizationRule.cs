using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Variables;

internal sealed class VariableAuthorizationRule : AuthorizationRule<Variable>
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

    protected override ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken) => new(false);
}
