namespace Confix.Authoring;

public record NamespaceVariableValueScope(
    Guid? EnvironmentId,
    string Namespace) : VariableValueScope(EnvironmentId)
{
    /// <inheritdoc />
    public override string Identifier
        => $"/namespace:{Namespace}/environment:{EnvironmentId?.ToString() ?? "global"}";
}
