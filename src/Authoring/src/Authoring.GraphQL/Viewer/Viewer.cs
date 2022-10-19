using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Viewer;

public sealed class Viewer
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
