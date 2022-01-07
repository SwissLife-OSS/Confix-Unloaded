using Confix.Authoring.Store;

namespace Confix.Authoring;

public class DoNotUserSessionAccessor : IUserSessionAccessor
{
    public UserInfo GetUserInfo() => new() { Email = "foobar@confix.com" };
}
