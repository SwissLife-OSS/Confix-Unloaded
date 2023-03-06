using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing.Authorization;

public record DeveloperAccessRequest(Environment Environment, Application Application);
