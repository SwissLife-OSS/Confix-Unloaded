using HotChocolate;

namespace Confix.Authoring;

public record VariableValueFilter(Guid Id)
{
    public Optional<Guid?> EnvironmentId { get; init; }

    public Optional<Guid?> ApplicationId { get; init; }

    public Optional<Guid?> PartId { get; init; }
}
