using Confix.Authoring.Changes;
using Confix.Authoring.Variables.Changes;

namespace Confix.Authoring.Store.Mongo.Configuration;

public static class WellKnownChangeLogFields
{
    public static string ApplicationId
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationChange.ApplicationId)}";

    public static string ApplicationPartId
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartChange.PartId)}";

    public static string PartComponentId
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartComponentChange.PartComponentId)}";

    public static string ComponentId
        => $"{nameof(ChangeLog.Change)}.{nameof(IComponentChange.ComponentId)}";

    public static string ComponentVersion
        => $"{nameof(ChangeLog.Change)}.{nameof(IComponentChange.ComponentVersion)}";

    public static string VariableId
        => $"{nameof(ChangeLog.Change)}.{nameof(IVariableChange.VariableId)}";

    public static string VariableVersion
        => $"{nameof(ChangeLog.Change)}.{nameof(IVariableChange.VariableVersion)}";

    public static string ApplicationVersion
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationChange.ApplicationVersion)}";

    public static string ApplicationPartVersion
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartChange.PartVersion)}";

    public static string PartComponentVersion
        => $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartComponentChange.PartComponentVersion)}";
}
