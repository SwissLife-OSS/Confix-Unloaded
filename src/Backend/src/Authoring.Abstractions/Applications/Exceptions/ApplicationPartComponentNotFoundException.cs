namespace Confix.Authoring;

public sealed class ApplicationPartComponentNotFoundException : Exception
{
    public ApplicationPartComponentNotFoundException(Guid componentPartId)
        : base($"The component part with id {componentPartId:N}.")
    {
        ComponentPartId = componentPartId;
    }

    public Guid ComponentPartId { get; set; }
}
