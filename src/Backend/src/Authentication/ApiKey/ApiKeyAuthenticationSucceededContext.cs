using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

namespace Confix.Authentication.ApiKey;

public class ApiKeyAuthenticationSucceededContext : ResultContext<ApiKeyOptions>
{
    public ApiKeyAuthenticationSucceededContext(
        HttpContext context,
        AuthenticationScheme scheme,
        ApiKeyOptions options,
        ClaimsPrincipal principal)
        : base(context, scheme, options)
    {
        Principal = principal;
    }
}
