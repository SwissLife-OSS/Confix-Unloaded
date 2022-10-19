namespace Confix.Authoring;

public sealed class EntityIdInvalidException : Exception
{
    public EntityIdInvalidException(string entityName, Guid entityId)
        : base($"The {entityName} id `{entityId}` is invalid.")
    {
        EntityName = entityName;
        EntityId = entityId;
    }

    public string EntityName { get; }

    public Guid EntityId { get; }
}
