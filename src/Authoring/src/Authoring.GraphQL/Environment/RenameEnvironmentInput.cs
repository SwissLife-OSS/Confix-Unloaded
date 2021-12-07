using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

public record RenameEnvironmentInput([property: ID(nameof(Environment))] Guid Id, string Name);
