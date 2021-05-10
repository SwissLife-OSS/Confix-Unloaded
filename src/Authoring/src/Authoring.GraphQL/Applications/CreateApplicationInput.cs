using System.Collections.Generic;

namespace Confix.Authoring.GraphQL.Applications
{
    public record CreateApplicationInput(
        string Name,
        string Namespace,
        IReadOnlyList<string>? Parts = null);
}
