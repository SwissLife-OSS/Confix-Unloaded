using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring;

public class ChangeLogService : IChangeLogService
{
    private readonly IChangeLogStore _changeLogStore;
    private readonly IUserSessionAccessor _sessionAccessor;
    private readonly ChangeLogByIdDataloader _byIdDataloader;
    private readonly ChangeLogByApplicationIdDataloader _changesByAppId;
    private readonly ChangeLogByApplicationPartIdDataloader _changesByPartId;
    private readonly ChangeLogByApplicationPartComponentIdDataloader _changesByAppCompId;
    private readonly ChangeLogByVariableIdDataloader _changesByVariableId;
    private readonly ChangeLogByComponentIdDataloader _changesByComponentId;

    public ChangeLogService(
        IChangeLogStore changeLogStore,
        IUserSessionAccessor sessionAccessor,
        ChangeLogByIdDataloader byIdDataloader,
        ChangeLogByApplicationIdDataloader changesByAppId,
        ChangeLogByApplicationPartIdDataloader changesByPartId,
        ChangeLogByApplicationPartComponentIdDataloader changesByAppCompId,
        ChangeLogByVariableIdDataloader changesByVariableId,
        ChangeLogByComponentIdDataloader changesByComponentId)
    {
        _changeLogStore = changeLogStore;
        _sessionAccessor = sessionAccessor;
        _byIdDataloader = byIdDataloader;
        _changesByAppId = changesByAppId;
        _changesByPartId = changesByPartId;
        _changesByAppCompId = changesByAppCompId;
        _changesByVariableId = changesByVariableId;
        _changesByComponentId = changesByComponentId;
    }

    public async Task<ChangeLog> CreateAsync(
        IChange change,
        CancellationToken cancellationToken)
    {
        ChangeLog log = new ChangeLog
        {
            Id = Guid.NewGuid(),
            Change = change,
            ModifiedBy = _sessionAccessor.GetUserInfo(),
            ModifiedAt = DateTime.UtcNow
        };
        await _changeLogStore.AddAsync(log, cancellationToken);
        return log;
    }

    public async Task<IReadOnlyList<ChangeLog>> CreateAsync(
        IEnumerable<IChange> changes,
        CancellationToken cancellationToken)
    {
        IReadOnlyList<ChangeLog> logs = changes
            .Select(x => new ChangeLog
            {
                Id = Guid.NewGuid(),
                Change = x,
                ModifiedBy = _sessionAccessor.GetUserInfo(),
                ModifiedAt = DateTime.UtcNow
            })
            .ToArray();

        await _changeLogStore.AddAsync(logs, cancellationToken);

        return logs;
    }

    public async Task<IEnumerable<ChangeLog>> GetByApplicationId(
        Guid applicationId,
        CancellationToken cancellationToken) =>
        (await _changesByAppId.LoadAsync(applicationId, cancellationToken)).OfType<ChangeLog>();

    public async Task<IEnumerable<ChangeLog>> GetByApplicationPartId(
        Guid applicationPartId,
        CancellationToken cancellationToken) =>
        (await _changesByPartId.LoadAsync(applicationPartId, cancellationToken))
        .OfType<ChangeLog>();

    public async Task<ChangeLog?> GetById(
        Guid changeLogId,
        CancellationToken cancellationToken) =>
        await _byIdDataloader.LoadAsync(changeLogId, cancellationToken);

    public async Task<IEnumerable<ChangeLog>> GetByApplicationPartComponentId(
        Guid componentId,
        CancellationToken cancellationToken) =>
        (await _changesByAppCompId.LoadAsync(componentId, cancellationToken)).OfType<ChangeLog>();

    public async Task<IEnumerable<ChangeLog>> GetByComponentId(
        Guid componentId,
        CancellationToken cancellationToken) =>
        (await _changesByComponentId.LoadAsync(componentId, cancellationToken))
        .OfType<ChangeLog>();

    public async Task<IEnumerable<ChangeLog>> GetByVariableId(
        Guid variableId,
        CancellationToken cancellationToken) =>
        (await _changesByVariableId.LoadAsync(variableId, cancellationToken))
        .OfType<ChangeLog>();

    public Task<ChangeLog?> GetByApplicationPartComponentIdAndVersion(
        Guid componentId,
        int version,
        CancellationToken cancellationToken)
    {
        return _changeLogStore
            .GetByApplicationPartComponentIdAndVersionAsync(componentId,
                version,
                cancellationToken);
    }
}
