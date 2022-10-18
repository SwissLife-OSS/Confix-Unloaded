using System.Collections.Immutable;
using Confix.Authentication.Authorization;
using Microsoft.Extensions.Options;

namespace Confix.Authoring;

public class SeedWorker : BackgroundService
{
    private readonly Guid _adminRoleId = Guid.Parse("D64EF313-CF5A-46CC-94CA-F5B677B25128");
    private readonly Guid _adminGroupId = Guid.Parse("66F0A60D-EDFD-4265-9AC4-6864ADC010FB");
    private readonly IOptions<AdminRequirementOptions> _options;
    private readonly IRoleStore _role;
    private readonly IGroupStore _group;

    public SeedWorker(IOptions<AdminRequirementOptions> options, IRoleStore role, IGroupStore group)
    {
        _options = options;
        _role = role;
        _group = group;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (await _role.GetByIdAsync(_adminRoleId, stoppingToken) is null)
        {
            var role = new Role(
                _adminRoleId,
                "Admin",
                new[]
                {
                    new Permission(Scope.Identity, Permissions.Read | Permissions.Write),
                    new Permission(Scope.Environment, Permissions.Write)
                });

            await _role.UpsertAsync(role, stoppingToken);
        }

        if (await _group.GetByIdAsync(_adminGroupId, stoppingToken) is null)
        {
            var group = new Group(_adminGroupId,
                "Admin",
                ImmutableHashSet
                    .Create<Requirement>()
                    .Add(new ClaimRequirement(_options.Value.Type, _options.Value.Value)),
                ImmutableHashSet.Create<RoleScope>()
                    .Add(new(WellKnownNamespaces.Global, new[] { _adminRoleId })));

            await _group.UpsertAsync(group, stoppingToken);
        }
    }
}
