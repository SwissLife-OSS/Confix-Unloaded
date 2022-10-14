using Confix.Authentication.Authorization;
using Confix.Authoring.Store;

namespace Confix.Authoring.Variables;

public class VariableValueAuthorizationRule : AuthorizationRule<VariableValue>
{
    private readonly IVariableDataLoader _variableById;
    private readonly IAuthorizationService _authorizationService;

    public VariableValueAuthorizationRule(
        ISessionAccessor accessor,
        IVariableDataLoader variableById,
        IAuthorizationService authorizationService) : base(accessor)
    {
        _variableById = variableById;
        _authorizationService = authorizationService;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        VariableValue resource,
        ISession session,
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        var variable = await _variableById.LoadAsync(resource.Key.VariableId, cancellationToken);

        return await _authorizationService
            .RuleFor<Variable>()
            .IsAuthorizedAsync(variable, permissions, cancellationToken);
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
