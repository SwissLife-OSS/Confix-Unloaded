using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

public class ChangeLogService : IChangeLogService
{
    private readonly IChangeLogStore _changeLogStore;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly ChangeLogByIdDataloader _byIdDataloader;
    private readonly ChangeLogByApplicationIdDataloader _changesByAppId;
    private readonly ChangeLogByApplicationPartIdDataloader _changesByPartId;
    private readonly ChangeLogByApplicationPartComponentIdDataloader _changesByAppCompId;
    private readonly ChangeLogByVariableIdDataloader _changesByVariableId;
    private readonly ChangeLogByComponentIdDataloader _changesByComponentId;
    private readonly IApplicationDataLoader _applicationById;
    private readonly IApplicationPartDataLoader _applicationPartById;
    private readonly IApplicationPartComponentDataLoader _componentDataLoader;
    private readonly IAuthorizationRule<Application> _applicationRule;
    private readonly IAuthorizationRule<ApplicationPart> _applicationPartRule;
    private readonly IAuthorizationRule<ApplicationPartComponent> _applicationPartComponentRule;

    public ChangeLogService(
        IChangeLogStore changeLogStore,
        ISessionAccessor sessionAccessor,
        ChangeLogByIdDataloader byIdDataloader,
        ChangeLogByApplicationIdDataloader changesByAppId,
        ChangeLogByApplicationPartIdDataloader changesByPartId,
        ChangeLogByApplicationPartComponentIdDataloader changesByAppCompId,
        ChangeLogByVariableIdDataloader changesByVariableId,
        ChangeLogByComponentIdDataloader changesByComponentId,
        IApplicationDataLoader applicationById,
        IApplicationPartDataLoader applicationPartById,
        IApplicationPartComponentDataLoader componentDataLoader,
        IAuthorizationRule<Application> applicationRule,
        IAuthorizationRule<ApplicationPart> applicationPartRule,
        IAuthorizationRule<ApplicationPartComponent> applicationPartComponentRule)
    {
        _changeLogStore = changeLogStore;
        _sessionAccessor = sessionAccessor;
        _byIdDataloader = byIdDataloader;
        _changesByAppId = changesByAppId;
        _changesByPartId = changesByPartId;
        _changesByAppCompId = changesByAppCompId;
        _changesByVariableId = changesByVariableId;
        _changesByComponentId = changesByComponentId;
        _applicationById = applicationById;
        _applicationPartById = applicationPartById;
        _componentDataLoader = componentDataLoader;
        _applicationRule = applicationRule;
        _applicationPartRule = applicationPartRule;
        _applicationPartComponentRule = applicationPartComponentRule;
    }

    public async Task<ChangeLog> CreateAsync(
        IChange change,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        ChangeLog log = new ChangeLog(
            Guid.NewGuid(),
            change,
            session.UserInfo,
            DateTime.UtcNow);

        await _changeLogStore.AddAsync(log, cancellationToken);
        return log;
    }

    public async Task<IReadOnlyList<ChangeLog>> CreateAsync(
        IEnumerable<IChange> changes,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        IReadOnlyList<ChangeLog> logs = changes
            .Select(x => new ChangeLog(Guid.NewGuid(), x, session.UserInfo, DateTime.UtcNow))
            .ToArray();

        await _changeLogStore.AddAsync(logs, cancellationToken);

        return logs;
    }

    public async Task<IEnumerable<ChangeLog>> GetByApplicationId(
        Guid applicationId,
        CancellationToken cancellationToken)
    {
        if (!await _applicationRule.IsAuthorizedAsync(
                await _applicationById.LoadAsync(applicationId, cancellationToken),
                cancellationToken
            ))
        {
            return Array.Empty<ChangeLog>();
        }

        return (await _changesByAppId.LoadAsync(applicationId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<IEnumerable<ChangeLog>> GetByApplicationPartId(
        Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        if (!await _applicationPartRule.IsAuthorizedAsync(
                await _applicationPartById.LoadAsync(applicationPartId, cancellationToken),
                cancellationToken
            ))
        {
            return Array.Empty<ChangeLog>();
        }

        return (await _changesByPartId.LoadAsync(applicationPartId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<ChangeLog?> GetById(
        Guid changeLogId,
        CancellationToken cancellationToken)
    {
        var result = await _byIdDataloader.LoadAsync(changeLogId, cancellationToken);
    }

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
