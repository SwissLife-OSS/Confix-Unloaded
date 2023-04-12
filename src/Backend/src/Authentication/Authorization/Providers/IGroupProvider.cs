using System.Security.Claims;

namespace Confix.Authentication.Authorization;

internal interface IGroupProvider
{
    ValueTask<IReadOnlyList<Group>> GetGroupsOfUserAsync(
        ClaimsPrincipal principal,
        CancellationToken cancellationToken);
}
