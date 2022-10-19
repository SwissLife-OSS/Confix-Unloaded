namespace Confix.Authentication.Authorization;

public interface IRoleProvider
{
    ValueTask<IReadOnlyDictionary<Guid, Role>> GetRoleMapAsync(CancellationToken cancellationToken);
}
