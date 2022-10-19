using System;

namespace Confix.Vault.Core;

public sealed class ConfigurationNotFoundException : Exception
{
    public ConfigurationNotFoundException() : base("The configuration could not be found")
    {
    }
}
