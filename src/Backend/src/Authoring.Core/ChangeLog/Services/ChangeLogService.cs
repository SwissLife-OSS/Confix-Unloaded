using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

internal sealed class ChangeLogService : IChangeLogService
{
    private readonly IApplicationDataLoader _applicationById;
    private readonly IApplicationPartDataLoader _applicationPartById;
    private readonly IApplicationPartComponentDataLoader _applicationPartComponentById;
    private readonly IAuthorizationService _authorizationService;
    private readonly ChangeLogByIdDataloader _byIdDataloader;
    private readonly IChangeLogStore _changeLogStore;
    private readonly ChangeLogByApplicationPartComponentIdDataloader _changesByAppCompId;
    private readonly ChangeLogByApplicationIdDataloader _changesByAppId;
    private readonly ChangeLogByComponentIdDataloader _changesByComponentId;
    private readonly ChangeLogByApplicationPartIdDataloader _changesByPartId;
    private readonly ChangeLogByVariableIdDataloader _changesByVariableId;
    private readonly IComponentDataLoader _componentById;
    private readonly ISessionAccessor _sessionAccessor;
    private readonly IVariableDataLoader _variableById;

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
        IAuthorizationService authorizationService,
        IApplicationPartComponentDataLoader applicationPartComponentById,
        IComponentDataLoader componentById,
        IVariableDataLoader variableById)
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
        _authorizationService = authorizationService;
        _applicationPartComponentById = applicationPartComponentById;
        _componentById = componentById;
        _variableById = variableById;
    }

    // TODO this should not be in a service => move outside
    public async Task<ChangeLog> CreateAsync(IChange change, CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);

        if (session is null)
        {
            throw new UnauthorizedOperationException();
        }

        var log = new ChangeLog(Guid.NewGuid(), change, session.UserInfo, DateTime.UtcNow);

        await _changeLogStore.AddAsync(log, cancellationToken);

        return log;
    }

    // TODO this should not be in a service => move outside
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
        var application = await _applicationById.LoadAsync(applicationId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ChangeLog>()
                .IsAuthorizedFromAsync(application, Read, cancellationToken))
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
        if (!await _authorizationService
                .RuleFor<ChangeLog>()
                .IsAuthorizedFromAsync(
                    await _applicationPartById.LoadAsync(applicationPartId, cancellationToken),
                    Read,
                    cancellationToken))
        {
            return Array.Empty<ChangeLog>();
        }

        return (await _changesByPartId.LoadAsync(applicationPartId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<ChangeLog?> GetById(Guid changeLogId, CancellationToken cancellationToken)
    {
        var result = await _byIdDataloader.LoadAsync(changeLogId, cancellationToken);

        return await _authorizationService
            .RuleFor<ChangeLog>()
            .AuthorizeOrNullAsync(result, Read, cancellationToken);
    }

    public async Task<IEnumerable<ChangeLog>> GetByApplicationPartComponentId(
        Guid applicationPartId,
        CancellationToken cancellationToken)
    {
        var applicationPartComponent =
            await _applicationPartComponentById.LoadAsync(applicationPartId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ChangeLog>()
                .IsAuthorizedFromAsync(applicationPartComponent, Read, cancellationToken))
        {
            return Array.Empty<ChangeLog>();
        }

        // TODO this is wrong
        return (await _changesByAppCompId.LoadAsync(applicationPartId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<IEnumerable<ChangeLog>> GetByComponentId(
        Guid componentId,
        CancellationToken cancellationToken)
    {
        var component = await _componentById.LoadAsync(componentId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ChangeLog>()
                .IsAuthorizedFromAsync(component, Read, cancellationToken))
        {
            return Array.Empty<ChangeLog>();
        }

        return (await _changesByComponentId.LoadAsync(componentId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<IEnumerable<ChangeLog>> GetByVariableId(
        Guid variableId,
        CancellationToken cancellationToken)
    {
        var variable = await _variableById.LoadAsync(variableId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ChangeLog>()
                .IsAuthorizedFromAsync(variable, Read, cancellationToken))
        {
            return Array.Empty<ChangeLog>();
        }

        return (await _changesByVariableId.LoadAsync(variableId, cancellationToken))
            .OfType<ChangeLog>();
    }

    public async Task<ChangeLog?> GetByApplicationPartComponentIdAndVersion(
        Guid componentId,
        int version,
        CancellationToken cancellationToken)
    {
        var changelog = await _changeLogStore
        .GetByApplicationPartComponentIdAndVersionAsync(componentId, version, cancellationToken);

        return await _authorizationService
            .RuleFor<ChangeLog>()
            .AuthorizeOrNullAsync(changelog, Read, cancellationToken);
    }
}
