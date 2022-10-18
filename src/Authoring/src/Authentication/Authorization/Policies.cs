using Microsoft.AspNetCore.Authorization;

namespace Confix.Authentication.Authorization;

public static class Policies
{
    public static class Names
    {
        public const string VaultManage = nameof(Policies.VaultManage);
    }

    public static readonly AuthorizationPolicy VaultManage = new AuthorizationPolicyBuilder()
        .RequireClaim("scope", Scopes.VaultManage)
        .Build();
}
