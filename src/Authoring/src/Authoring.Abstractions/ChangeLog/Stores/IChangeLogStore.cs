using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store;

public interface IChangeLogStore
{
    Task AddAsync(ChangeLog changeLog, CancellationToken cancellationToken);

    Task AddAsync(IEnumerable<ChangeLog> changeLogs, CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByIdsAsync(
        IReadOnlyList<Guid> applicationIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByApplicationIdsAsync(
        IReadOnlyList<Guid> applicationIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByApplicationPartIdAsync(
        IReadOnlyList<Guid> partIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByPartComponentIdAsync(
        IReadOnlyList<Guid> partComponentIds,
        CancellationToken cancellationToken);

    Task<ChangeLog?> GetByApplicationPartComponentIdAndVersionAsync(
        Guid partComponentId,
        int version,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByComponentIdAsync(
        IReadOnlyList<Guid> componentIds,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<ChangeLog>> GetByVariableIdAsync(
        IReadOnlyList<Guid> variableIds,
        CancellationToken cancellationToken);
}
