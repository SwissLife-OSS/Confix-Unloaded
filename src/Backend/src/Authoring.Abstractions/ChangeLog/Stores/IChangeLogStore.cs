namespace Confix.Authoring.Store;

public interface IChangeLogStore
{
    Task AddAsync(ChangeLog changeLog, CancellationToken cancellationToken);

    Task AddAsync(IEnumerable<ChangeLog> changeLogs, CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByApplicationIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByApplicationPartIdAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByPartComponentIdAsync(
        IEnumerable<Guid> partComponentIds,
        CancellationToken cancellationToken);

    Task<ChangeLog?> GetByApplicationPartComponentIdAndVersionAsync(
        Guid partComponentId,
        int version,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByComponentIdAsync(
        IEnumerable<Guid> componentIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByVariableIdAsync(
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken);
}
