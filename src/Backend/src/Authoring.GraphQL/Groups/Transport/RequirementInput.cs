using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Transport;

[OneOf]
public sealed record RequirementInput(ClaimRequirementInput? ClaimRequirement) : IRequirementInput
{
    public Requirement Get()
    {
        IRequirementInput input = ClaimRequirement ??
            throw new InvalidOperationException("At least one requirement is required");

        return input.Get();
    }
}
