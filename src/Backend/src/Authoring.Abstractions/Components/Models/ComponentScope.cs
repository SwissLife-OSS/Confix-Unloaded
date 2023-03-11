using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record ComponentScope(
    string Namespace,
    [property: ID<Application>] Guid? ApplicationId,
    [property: ID<ApplicationPart>] Guid? ApplicationPartId);
