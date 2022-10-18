using System.Security.Claims;

namespace Confix.Authentication.Authorization;

public record ClaimRequirement(string Type, string Value) : Requirement
{
    public override bool Validate(ClaimsPrincipal principal)
    {
        return principal.HasClaim(Type, Value);
    }
}
