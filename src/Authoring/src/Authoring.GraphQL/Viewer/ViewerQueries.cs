using Confix.Authentication.Authorization;

namespace Confix.Authoring.GraphQL.Viewer;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class ViewerQueries
{
    public async ValueTask<Viewer?> GetMe(
        [Service] ISessionAccessor accessor,
        CancellationToken cancellationToken) =>
        await accessor.GetSession(cancellationToken) is { } session ? new Viewer(session) : null;
}
