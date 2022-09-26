using Confix.Authentication.Authorization;
using Confix.Authoring.Changes;
using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;

namespace Confix.Authoring;

public class ChangeLogAuthorizationRule : AuthorizationRule<ChangeLog>
{
    private readonly IApplicationDataLoader _applicationById;
    private readonly IComponentDataLoader _componentById;
    private readonly IVariableDataLoader _variableDataLoader;
    private readonly IAuthorizationService _authorization;

    public ChangeLogAuthorizationRule(
        ISessionAccessor accessor,
        IAuthorizationService authorization,
        IApplicationDataLoader applicationById,
        IComponentDataLoader componentById,
        IVariableDataLoader variableDataLoader) : base(accessor)
    {
        _authorization = authorization;
        _applicationById = applicationById;
        _componentById = componentById;
        _variableDataLoader = variableDataLoader;
    }

    protected override async ValueTask<bool> IsAuthorizedAsync(
        ChangeLog resource,
        ISession session,
        CancellationToken cancellationToken)
    {
        return resource.Change switch
        {
            IComponentChange { ComponentId: var id } =>
                await _authorization.IsAuthorized(
                    await _componentById.LoadAsync(id, cancellationToken),
                    cancellationToken),

            IVariableChange { VariableId: var id } =>
                await _authorization.IsAuthorized(
                    await _variableDataLoader.LoadAsync(id, cancellationToken),
                    cancellationToken),

            IApplicationChange { ApplicationId: var id } => await _authorization
                .IsAuthorized(await _applicationById.LoadAsync(id, cancellationToken),
                    cancellationToken),

            _ => false
        };
    }
}
