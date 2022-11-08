using Confix.Authentication.ApiKey;

namespace Confix.Authoring.ApiKeys;

public record ApiKeyWithSecret(ApiKey Key, string Secret);
