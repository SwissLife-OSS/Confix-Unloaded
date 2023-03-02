using Confix.Authoring.Store;

namespace Confix.Authoring.Publishing;

internal static class ThrowHelper
{
    public static Exception PublishingFailedBecauseComponentWasNotFound(
        ApplicationPart part,
        Guid componentId)
    {
        return new PublishingException($"Could not publish application part {part.Name}. " +
            $"Component with id {componentId} not found");
    }

    public static Exception PublishingFailedBecauseComponentValuesWereNotPresent(
        ApplicationPart part,
        Component component)
    {
        return new PublishingException(
            $"Could not publish application part {part.Name}. There are no values configured for " +
            $"component {component.Name} not found");
    }

    // TODO specific exception
    public static Exception PublishingFailedBecauseValuesDidNotMatchSchema(
        ApplicationPart part,
        Component component,
        IEnumerable<SchemaViolation> violations)
    {
        return new PublishingException(
            $"Could not publish application part {part.Name}. The values did not match the schema");
    }

    public static Exception PublishingFailedBecauseVariableValueWasNotPresent(
        ApplicationPart part,
        Component component,
        string variableName)
    {
        return new PublishingException(
            $"Could not publish application part {part.Name}. No variable with name ${variableName} " +
            "was found");
    }

    public static Exception PublishingFailedBecauseApplicationPartWasNotFound(Guid id)
    {
        return new PublishingException($"Could not find application part with id {id}");
    }

    public static Exception ClaimFailedBecauseVariableValueWasNotPresent(
        ApplicationPart part,
        string environment,
        string variableName)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {part.Name}. No value for variable ${variableName} " +
            $"in env {environment}");
    }

    public static Exception ClaimFailedBecauseEnvWasNotFound(
        string applicationName,
        string partName,
        string environment)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {applicationName}.{partName}. " +
            $"Environement {environment} was not found.");
    }

    public static Exception ClaimFailedBecauseApplicationWasNotFound(
        string applicationName,
        string partName)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {applicationName}.{partName}. " +
            $"Application {applicationName} was not found.");
    }

    public static Exception ClaimFailedBecauseApplicationPartWasNotFound(
        string applicationName,
        string partName)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {applicationName}.{partName}. " +
            $"Application part {partName}  was not found in {applicationName}.");
    }

    public static Exception ClaimFailedBecauseNoPublishedConfigurationWasFound(
        string applicationName,
        string partName,
        string environment)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {applicationName}.{partName}. ({environment}) " +
            "There was no configuration published for this part.");
    }

    public static Exception ClaimFailedBecauseOtherClaimAlreadyInProgress(
        string applicationName,
        string partName,
        string environment)
    {
        return new ClaimVersionFailedException(
            $"Could not claim application part {applicationName}.{partName}. ({environment}) " +
            "There was another claim already in progress.");
    }

    public static Exception EnvironmentWasNotFound(Guid environmentId)
    {
        return new EnvironmentNotFoundException(environmentId);
    }

    public static Exception EnvironmentCycleDetected(IEnumerable<string> path)
    {
        return new EnvironmentCycleDetectedException(path);
    }
}
