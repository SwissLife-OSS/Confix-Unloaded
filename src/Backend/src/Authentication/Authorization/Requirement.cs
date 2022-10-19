using System.Security.Claims;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authentication.Authorization;

[UnionType]
public abstract record Requirement
{
    [GraphQLIgnore]
    public abstract bool Validate(ClaimsPrincipal principal);
}
