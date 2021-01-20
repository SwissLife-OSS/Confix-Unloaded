using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Azure.Identity;
using Azure.Security.KeyVault.Keys;
using Azure.Security.KeyVault.Keys.Cryptography;
using Confix.Authoring;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.CryptoProvider.AzureKeyVault
{
    public static class AzureKeyVaultServiceCollectionExtensions
    {
        public static IConfixServerBuilder AddAzureKeyVaultCryptoProvider(
            this IConfixServerBuilder builder)
        {
            AzureKeyVaultOptions options = builder.Configuration.GetSection("Confix:AzureKeyVault")
                .Get<AzureKeyVaultOptions>();

            builder.Services.AddSingleton(options);
            builder.Services.AddSingleton<ICryptographyClientFactory, CryptographyClientFactory>();
            builder.Services.AddSingleton<IVariableCryptoProvider, KeyVaultVariableCryptoProvider>();

            return builder;
        }
    }
}
