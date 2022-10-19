using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Transport;

public sealed record ClaimRequirementInput(string Type, string Value) : IRequirementInput
{
    public Requirement Get()
    {
        return new ClaimRequirement(Type, Value);
    }
}
