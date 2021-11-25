using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

public record DeleteEnvironmentInput([ID(nameof(Environment))] Guid Id);
