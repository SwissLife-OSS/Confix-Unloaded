using System;
using System.Collections.Generic;
using System.Linq;

namespace Confix.Authoring;

public sealed class EnvironmentCycleDetectedException : Exception
{
    public EnvironmentCycleDetectedException(IEnumerable<string> path)
        : base("There was a cycle in the parent child relation of environments detected")
    {
        Path = path.ToArray();
    }

    public IReadOnlyList<string> Path { get; }

    public string Code => "EnvironmentCycleDetected";
}
