using System.Collections.Immutable;
using Confix.Authentication.Authorization;
using HotChocolate;
using HotChocolate.Types.Relay;

namespace Confix.Authentication.ApiKey;

public record ApiKey(
    [property: ID] Guid Id,
    string Name,
    [property: GraphQLIgnore] string KeyHash,
    [property: GraphQLIgnore] string KeyPrefix,
    ImmutableHashSet<RoleScope> Roles)
{
    private const int PrefixLength = 10;
    public static readonly int KeyLength = 64;


    public static string GetPrefix(string key)
    {
        if (key.Length < PrefixLength)
        {
            throw new ArgumentException("Provided key is too short", nameof(key));
        }

        return key[..PrefixLength];
    }
}
