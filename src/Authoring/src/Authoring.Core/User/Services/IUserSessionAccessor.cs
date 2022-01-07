using Confix.Authoring.Store;

namespace Confix.Authoring;

public interface IUserSessionAccessor
{
    UserInfo GetUserInfo();
}
