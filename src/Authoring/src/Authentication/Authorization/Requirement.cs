using System.Security.Claims;

namespace Confix.Authentication.Authorization;

public abstract record Requirement
{
    public abstract bool Validate(ClaimsPrincipal principal);
}
