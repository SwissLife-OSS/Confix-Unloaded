namespace Confix.Authoring.Store;

public interface IComponentStore
{
    Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Component>> Search(
        int skip,
        int take,
        IEnumerable<string> namespaces,
        Guid? applicationId,
        Guid? applicationPartId,
        string? search,
        CancellationToken cancellationToken);

    Task<Component> AddAsync(Component component, CancellationToken cancellationToken);

    Task<Component> UpdateAsync(Component component, CancellationToken cancellationToken);
}
