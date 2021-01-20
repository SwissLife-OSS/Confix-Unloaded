using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Security.KeyVault.Keys.Cryptography;

namespace Confix.CryptoProvider.AzureKeyVault
{
    public class AzureKeyVaultOptions
    {
        public string Url { get; set; } = default!;

        public string EncryptionKeyId { get; set; } = default!;

        public string Algorithm { get; set; } = "RSA-OAEP-256";
    }
}
