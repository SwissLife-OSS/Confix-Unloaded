using HotChocolate.Execution;
using Path = HotChocolate.Path;

namespace Confix.Authoring.Internal;

public static class PathExtensions
{
    public static Path Append(this Path path, string name)
        => PathFactory.Instance.Append(path, name);

    public static Path Append(this Path path, int number)
        => PathFactory.Instance.Append(path, number);
}
