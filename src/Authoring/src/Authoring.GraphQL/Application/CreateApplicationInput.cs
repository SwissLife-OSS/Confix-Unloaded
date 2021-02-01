using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public record CreateApplicationInput(
        string Name,
        IReadOnlyList<string>? Parts = null);
}
