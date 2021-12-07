using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

public record RemoveEnvironmentInput([property: ID(nameof(Environment))] Guid Id);
