using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Confix.Authoring;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ConfiX;

public static class TestContext
{
    public static IConfiguration BuildConfig()
    {
        IConfigurationRoot config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
             .AddJsonFile("appsettings.json", optional: true)
             .AddUserSecrets<KeyVaultVariableCryptoProviderTests>(optional: true)
             .Build();

        return config;
    }

    public static IConfixServerBuilder GetBuilder()
    {
        return new TestConfixServerBuilder(BuildConfig());
    }

    public class TestConfixServerBuilder : IConfixServerBuilder
    {
        public TestConfixServerBuilder(IConfiguration configuration)
        {
            Configuration = configuration;
            Services = new ServiceCollection();
        }

        public IServiceCollection Services { get; }

        public IConfiguration Configuration { get; }
    }
}
