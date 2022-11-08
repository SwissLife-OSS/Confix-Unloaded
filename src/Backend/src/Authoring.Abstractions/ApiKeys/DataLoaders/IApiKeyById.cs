using Confix.Authentication.ApiKey;
using GreenDonut;

namespace Confix.Authoring.ApiKeys.DataLoaders;

public interface IApiKeyByIdDataLoader : IDataLoader<Guid, ApiKey?>
{
}
