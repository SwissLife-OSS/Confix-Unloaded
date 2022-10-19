using Confix.Authentication.Authorization;
using Confix.Authoring.Changes;
using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;

namespace Confix.Authoring;

internal sealed class ChangeLogAuthorizationRule : AuthorizationRule<ChangeLog>
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
        Permissions permissions,
        CancellationToken cancellationToken)
    {
        return resource.Change switch
        {
            IComponentChange { ComponentId: var id } =>
                await _authorization
                    .RuleFor<Component>()
                    .IsAuthorizedAsync(
                        await _componentById.LoadAsync(id, cancellationToken),
                        permissions,
                        cancellationToken),

            IVariableChange { VariableId: var id } =>
                await _authorization
                    .RuleFor<Variable>()
                    .IsAuthorizedAsync(
                        await _variableDataLoader.LoadAsync(id, cancellationToken),
                        permissions,
                        cancellationToken),

            IApplicationChange { ApplicationId: var id } =>
                await _authorization
                    .RuleFor<Application>()
                    .IsAuthorizedAsync(
                        await _applicationById.LoadAsync(id, cancellationToken),
                        permissions,
                        cancellationToken),

            _ => false
        };
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
            Application r => await _authorization
                .RuleFor<Application>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            ApplicationPart r => await _authorization
                .RuleFor<ApplicationPart>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            ApplicationPartComponent r => await _authorization
                .RuleFor<ApplicationPartComponent>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            Component r => await _authorization
                .RuleFor<Component>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            Variable r => await _authorization
                .RuleFor<Variable>()
                .IsAuthorizedAsync(r, permissions, cancellationToken),

            _ => false
        };
    }
}
