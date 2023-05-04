namespace Confix.Authoring;

public record NamespaceVariableValueScope( Guid? EnvironmentId, string Namespace)
    : VariableValueScope(EnvironmentId);
