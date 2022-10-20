using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Confix.Authentication.Authorization;

public class SessionAccessor : ISessionAccessor
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IGroupProvider _groupProvider;
    private readonly object _lockObject = new();
    private readonly IRoleProvider _roleProvider;

    private Holder? _session;

    public SessionAccessor(
        IHttpContextAccessor accessor,
        IGroupProvider groupProvider,
        IRoleProvider roleProvider)
    {
        _accessor = accessor;
        _groupProvider = groupProvider;
        _roleProvider = roleProvider;
    }

    public async ValueTask<ISession?> GetSession(CancellationToken cancellationToken)
    {
        if (_session is null)
        {
            lock (_lockObject)
            {
                if (_session is null)
                {
                    _session = new Holder(CreateSession(cancellationToken));
                }
            }
        }

        return await _session.Value.Get();
    }

    private async Task<ISession?> CreateSession(CancellationToken cancellationToken)
    {
        var context = _accessor.HttpContext;

        if (context?.User is null)
        {
            return null;
        }

        var groups = await _groupProvider.GetGroupsOfUserAsync(context.User, cancellationToken);
        var roleMap = await _roleProvider.GetRoleMapAsync(cancellationToken);

        // apply defaults

        var sub = context.User.FindFirstValue("sub");

        return new Session(sub, groups, roleMap);
    }

    private struct Holder
    {
        private Task<ISession?>? _task;

        private ISession? _result;

        public Holder(Task<ISession?> task)
        {
            _task = task;
        }

        public async ValueTask<ISession?> Get()
        {
            if (_task is not null)
            {
                _result = await _task;
                _task = null;
            }

            return _result;
        }
    }
}
