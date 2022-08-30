using Confix.Vault.Core;

namespace Confix.Vault.Host;

public class DoNotUseKeyProvider : IKeyProvider
{
    public ValueTask<byte[]> GetKey() =>
        new(Convert.FromBase64String("2MHnfeVd7ubsMnHkdyli3vXB4sxkoxATpbjO+oiF0V0="));
}
