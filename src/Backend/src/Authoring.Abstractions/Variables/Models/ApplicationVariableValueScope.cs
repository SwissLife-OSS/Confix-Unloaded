using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public record ApplicationVariableValueScope(
    Guid? EnvironmentId,
    [property: ID<Application>] Guid ApplicationId) : VariableValueScope(EnvironmentId)
{
    /// <inheritdoc />
   // public override string Identifier
    //    => $"/application:{ApplicationId}/environment:{EnvironmentId?.ToString() ?? "global"}";
}
