using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL;

public record RenameVariableInput([property: ID(nameof(Variable))] Guid Id, string Name);
