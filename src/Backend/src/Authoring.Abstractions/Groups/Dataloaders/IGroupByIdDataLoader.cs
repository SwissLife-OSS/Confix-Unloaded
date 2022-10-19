using Confix.Authentication.Authorization;
using GreenDonut;

namespace Confix.Authoring.Groups;

public interface IGroupByIdDataLoader : IDataLoader<Guid, Group?>
{
}
