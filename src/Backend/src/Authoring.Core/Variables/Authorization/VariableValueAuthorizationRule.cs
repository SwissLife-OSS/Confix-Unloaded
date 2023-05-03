using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Variables;

internal sealed class VariableValueAuthorizationRule : AuthorizationRule<VariableValue>
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IApplicationDataLoader _applicationById;
    private readonly IApplicationByPartIdDataLoader _applicationByPartId;

    public VariableValueAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorizationService,
        IApplicationDataLoader applicationById,
        IApplicationByPartIdDataLoader applicationByPartId) : base(accessor)
    {
        _authorizationService = authorizationService;
        _applicationById = applicationById;
        _applicationByPartId = applicationByPartId;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        VariableValue resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        switch (resource.Scope)
        {
            case NamespaceVariableValueScope { Namespace: var @namespace }:
                return session.HasPermission(@namespace, Scope.Variable, permissions);

            case ApplicationVariableValueScope { ApplicationId: var applicationId }:
                var application =
                    await _applicationById.LoadAsync(applicationId, cancellationToken);

                if (application is null)
                {
                    return false;
                }

                return session.HasPermission(application.Namespace, Scope.Variable, permissions);

            case ApplicationPartVariableValueScope { PartId: var applicationPartId }:
                var applicationPart =
                    await _applicationByPartId.LoadAsync(applicationPartId, cancellationToken);

                if (applicationPart is null)
                {
                    return false;
                }

                return session
                    .HasPermission(applicationPart.Namespace, Scope.Variable, permissions);
        }

        return false;
    }

    protected override async ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return resource switch
        {
            Variable r => await _authorizationService
                .RuleFor<Variable>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),
            _ => false
        };
    }
}
