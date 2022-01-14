using System;
using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing;

public static class ThrowHelper
{
    public static Exception PublishingFailedBecauseComponentWasNotFound(
        ApplicationPart part,
        Guid componentId) => new PublishingException(
        $"Could not publish application part {part.Name}. " +
        $"Component with id {componentId} not found");

    public static Exception PublishingFailedBecauseComponentValuesWereNotPresent(
        ApplicationPart part,
        Component component) => new PublishingException(
        $"Could not publish application part {part.Name}. There are no values configured for " +
        $"component {component.Name} not found");

    public static Exception PublishingFailedBecauseVariableValueWasNotPresent(
        ApplicationPart part,
        Component component,
        string variableName) => new PublishingException(
        $"Could not publish application part {part.Name}. No value for variable ${variableName} " +
        $"was found in component {component.Name}");

    public static Exception PublishingFailedBecauseApplicationPartWasNotFound(Guid id) =>
        new PublishingException($"Could not find application part with id {id}");
}
