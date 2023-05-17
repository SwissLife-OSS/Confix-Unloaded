using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record ApplicationPartComponentScope([property: ID<ApplicationPart>]Guid ApplicationPartId): ComponentScope();

