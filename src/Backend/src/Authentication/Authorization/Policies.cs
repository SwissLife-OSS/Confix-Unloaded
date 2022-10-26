using Microsoft.AspNetCore.Authorization;

namespace Confix.Authentication.Authorization;

public static class Policies
{
    public static class Names
    {
        public const string VaultManage = nameof(VaultManage);
        public const string ConfigurationClaim = nameof(ConfigurationClaim);
    }

    public static readonly AuthorizationPolicy VaultManagePolicy = new AuthorizationPolicyBuilder()
        .RequireClaim("scope", Scopes.VaultManage)
        .Build();

    public static readonly AuthorizationPolicy ConfigurationClaimPolicy =
        new AuthorizationPolicyBuilder()
            .RequireClaim("scope", Scopes.ConfigurationClaim)
            .Build();
}
