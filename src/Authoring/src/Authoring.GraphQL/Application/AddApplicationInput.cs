using System.Collections.Generic;

namespace Confix.Authoring.GraphQL
{
    public record AddApplicationInput(
        string Name,
        IReadOnlyList<string>? Parts = null);
}
