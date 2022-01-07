using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public record Variable
{
    public Variable(
        Guid id,
        VariableState state,
        string name,
        bool isSecret,
        string? ns,
        int version)
    {
        Id = id;
        State = state;
        Name = name;
        IsSecret = isSecret;
        Namespace = ns;
        Version = version;
    }

    public Variable(Guid id, VariableState state, string name, bool isSecret, string? @namespace)
    {
        Id = id;
        State = state;
        Name = name;
        IsSecret = isSecret;
        Namespace = @namespace;
    }

    [ID]
    public Guid Id { get; init; }

    public VariableState State { get; init; }

    public string Name { get; init; }

    public bool IsSecret { get; init; }

    public string? Namespace { get; init; }

    public int Version { get; init; }
}

public record VariableKey
{
    public VariableKey(
        Guid variableId,
        Guid? applicationId,
        Guid? partId,
        Guid? environmentId)
    {
        VariableId = variableId;
        ApplicationId = applicationId;
        PartId = partId;
        EnvironmentId = environmentId;
    }

    public Guid VariableId { get; init; }

    public Guid? ApplicationId { get; init; }

    public Guid? PartId { get; init; }

    public Guid? EnvironmentId { get; init; }
}

public enum VariableState
{
    Active,
    Deprecated
}