using HotChocolate.Types.Relay;
using ApplicationPart = Confix.Authoring.Store.ApplicationPart;

namespace Confix.Authoring;

public record ApplicationPartVariableValueScope(
    Guid? EnvironmentId,
    [property: ID<ApplicationPart>] Guid PartId) : VariableValueScope(EnvironmentId)
{
    /// <inheritdoc />
    public override string Identifier
        => $"/part:{PartId}/environment:{EnvironmentId?.ToString() ?? "global"}";
}
