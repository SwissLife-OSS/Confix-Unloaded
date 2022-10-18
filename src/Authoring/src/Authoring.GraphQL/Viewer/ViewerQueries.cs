using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Viewer;

[ExtendObjectType(OperationTypeNames.Query)]
public class ViewerQueries
{
    public async ValueTask<Viewer?> GetMe(
        [Service] ISessionAccessor accessor,
        CancellationToken cancellationToken) =>
        await accessor.GetSession(cancellationToken) is { } session ? new Viewer(session) : null;
}

public class Viewer
{
    private readonly ISession _session;

    public Viewer(ISession session)
    {
        _session = session;
    }

    public string Name => _session.Name;

    public IReadOnlyList<Group> Groups => _session.Groups;

    public IEnumerable<string> Namespaces => _session.Namespaces;
}
