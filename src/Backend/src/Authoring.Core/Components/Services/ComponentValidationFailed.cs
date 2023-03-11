using System.Diagnostics.CodeAnalysis;

namespace Confix.Authoring;

public sealed class ComponentValidationFailed : Exception
{
    public ComponentValidationFailed(string message) : base(message) { }

    public string Code { get; } = "COMPONENT_VALIDATION_FAILED";

    public static ComponentValidationFailed AtLeastOneScopeIsRequired() =>
        new("At least one scope is required.");
}
