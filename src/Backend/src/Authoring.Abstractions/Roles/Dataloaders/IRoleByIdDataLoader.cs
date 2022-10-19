using Confix.Authentication.Authorization;
using GreenDonut;

namespace Confix.Authoring.Roles;

public interface IRoleByIdDataLoader : IDataLoader<Guid, Role?>
{
}
