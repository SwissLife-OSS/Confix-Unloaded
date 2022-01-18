using System;
using System.Collections.Generic;
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

    // TODO specific exception
    public static Exception PublishingFailedBecauseValuesDidNotMatchSchema(
        ApplicationPart part,
        Component component,
        IEnumerable<SchemaViolation> violations) => new PublishingException(
        $"Could not publish application part {part.Name}. The values did not match the schema");

    public static Exception PublishingFailedBecauseVariableValueWasNotPresent(
        ApplicationPart part,
        Component component,
        string variableName) => new PublishingException(
        $"Could not publish application part {part.Name}. No variable with name ${variableName} " +
        $"was found");

    public static Exception PublishingFailedBecauseApplicationPartWasNotFound(Guid id) =>
        new PublishingException($"Could not find application part with id {id}");

    public static Exception ClaimFailedBecauseVariableValueWasNotPresent(
        ApplicationPart part,
        string environment,
        string variableName) => new ClaimVersionFailedException(
        $"Could not claim application part {part.Name}. No value for variable ${variableName} " +
        $"in env {environment}");
}
