using System;
using HotChocolate.Types.Relay;

namespace Confix.Authoring;

public class Environment
{
    [ID]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
}
