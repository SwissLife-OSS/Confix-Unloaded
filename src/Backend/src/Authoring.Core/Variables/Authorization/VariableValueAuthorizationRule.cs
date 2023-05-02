using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Variables;

internal sealed class VariableValueAuthorizationRule : AuthorizationRule<VariableValue>
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IVariableDataLoader _variableById;

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
        var variable = await _variableById.LoadAsync(resource.VariableId, cancellationToken);

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
