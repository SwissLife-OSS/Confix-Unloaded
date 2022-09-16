using System.Security.Claims;

namespace Confix.Authentication.Authorization;

public interface IGroupProvider
{
    ValueTask<IReadOnlyList<Group>> GetGroupsOfUserAsync(
        ClaimsPrincipal principal,
        CancellationToken cancellationToken);
}
