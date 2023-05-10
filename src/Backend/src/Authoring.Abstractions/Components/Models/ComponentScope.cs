using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public abstract record ComponentScope();

public sealed record NamespaceComponentScope(string Namespace): ComponentScope();
public sealed record ApplicationComponentScope([property: ID<Application>]Guid ApplicationId): ComponentScope();
public sealed record ApplicationPartComponentScope([property: ID<ApplicationPart>]Guid ApplicationPartId): ComponentScope();

