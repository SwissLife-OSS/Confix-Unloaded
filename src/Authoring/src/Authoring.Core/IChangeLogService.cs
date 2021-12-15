using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring;

public interface IChangeLogService
{
    Task<ChangeLog> CreateAsync(IChange change, CancellationToken cancellationToken);
    Task<IReadOnlyList<ChangeLog>> CreateAsync(
        IEnumerable<IChange> changes,
        CancellationToken cancellationToken);

    Task<ChangeLog?> GetById(
        Guid changeLogId,
        CancellationToken cancellationToken);

    Task<IEnumerable<ChangeLog>> GetByApplicationId(
        Guid applicationId,
        CancellationToken cancellationToken);

    Task<IEnumerable<ChangeLog>> GetByApplicationPartId(
        Guid applicationPartId,
        CancellationToken cancellationToken);

    Task<IEnumerable<ChangeLog>> GetByApplicationPartComponentId(
        Guid componentId,
        CancellationToken cancellationToken);

    Task<ChangeLog?> GetByApplicationPartComponentIdAndVersion(
        Guid componentId,
        int version,
        CancellationToken cancellationToken);
}
