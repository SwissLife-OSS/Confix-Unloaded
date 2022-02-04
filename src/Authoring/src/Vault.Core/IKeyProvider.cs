using System.Threading.Tasks;

namespace Confix.Vault.Core;

public interface IKeyProvider
{
    ValueTask<byte[]> GetKey();
}
