using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record ApplicationComponentScope([property: ID<Application>]Guid ApplicationId): ComponentScope();

