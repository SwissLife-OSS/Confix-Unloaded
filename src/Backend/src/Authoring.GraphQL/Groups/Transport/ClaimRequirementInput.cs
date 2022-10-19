using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Transport;

public sealed record ClaimRequirementInput(string Type, string Value)
    : IRequirementInput
{
    public Requirement Get() => new ClaimRequirement(Type, Value);
}