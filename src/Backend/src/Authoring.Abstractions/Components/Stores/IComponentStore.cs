namespace Confix.Authoring.Store;

public interface IComponentStore
{
    Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    /// <summary>
    ///     Allows to query the component store.
    /// </summary>
    IQueryable<Component> Query();

    Task<Component> AddAsync(Component component, CancellationToken cancellationToken);

    Task<Component> UpdateAsync(Component component, CancellationToken cancellationToken);
}
