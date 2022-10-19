namespace Confix.Authoring.Store;

public interface IEnvironmentStore
{
    Task<Environment?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<Environment?> GetByNameAsync(string name, CancellationToken cancellationToken);

    Task<IReadOnlyCollection<Environment>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task AddAsync(Environment environment, CancellationToken cancellationToken);

    Task<Environment> UpdateAsync(Environment environment, CancellationToken cancellationToken);

    Task<Environment?> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken);

    Task<Environment?> RemoveByIdAsync(Guid environmentId, CancellationToken cancellationToken);

    IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default);
}
