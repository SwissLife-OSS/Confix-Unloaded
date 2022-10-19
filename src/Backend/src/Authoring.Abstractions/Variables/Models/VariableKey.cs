using Confix.Authoring.Store;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public sealed record VariableKey
{
    public VariableKey(Guid variableId, Guid? applicationId, Guid? partId, Guid? environmentId)
    {
        VariableId = variableId;
        ApplicationId = applicationId;
        PartId = partId;
        EnvironmentId = environmentId;
    }

    [ID(nameof(Variable))]
    public Guid VariableId { get; init; }

    [ID(nameof(Application))]
    public Guid? ApplicationId { get; init; }

    [ID(nameof(ApplicationPart))]
    public Guid? PartId { get; init; }

    [ID(nameof(Environment))]
    public Guid? EnvironmentId { get; init; }
}
