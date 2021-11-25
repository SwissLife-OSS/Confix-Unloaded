using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

public record UpdateEnvironmentNameInput([ID(nameof(Environment))] Guid Id, string Name);
