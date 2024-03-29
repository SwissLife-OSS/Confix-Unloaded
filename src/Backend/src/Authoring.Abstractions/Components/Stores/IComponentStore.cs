namespace Confix.Authoring.Store;

public interface IComponentStore
{
    Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Component>> GetByFilterAsync(
        IEnumerable<string> namespaces,
        IEnumerable<ComponentScope> scopes,
        string? search,
        int skip,
        int take,
        CancellationToken cancellationToken);

    Task<Component> AddAsync(Component component, CancellationToken cancellationToken);

    Task<Component> UpdateAsync(Component component, CancellationToken cancellationToken);
}
