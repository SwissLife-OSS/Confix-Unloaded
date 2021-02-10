using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public record CreateApplicationInput(
        string Name,
        string Namespace,
        IReadOnlyList<string>? Parts = null);
}
