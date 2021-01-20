using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ConfiX
{
    public static class Config
    {
        public static IConfiguration Build()
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .AddUserSecrets<KeyVaultVariableCryptoProviderTests>(optional: true)
                 .Build();

            return config;

        }
    }
}
