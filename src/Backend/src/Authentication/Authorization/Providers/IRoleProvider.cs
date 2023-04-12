namespace Confix.Authentication.Authorization;

internal interface IRoleProvider
{
    ValueTask<IReadOnlyDictionary<Guid, Role>> GetRoleMapAsync(CancellationToken cancellationToken);
}
