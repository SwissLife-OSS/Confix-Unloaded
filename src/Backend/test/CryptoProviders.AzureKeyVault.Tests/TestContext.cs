using Confix.Authoring;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Value.Configuration;

public static class TestContext
{
    public static IConfiguration BuildConfig()
    {
        var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true)
            .AddUserSecrets<KeyVaultVariableCryptoProviderTests>(true)
            .Build();

        return config;
    }

    public static IAuthoringServerBuilder GetBuilder()
    {
        return new TestAuthoringServerBuilder(BuildConfig());
    }

    public class TestAuthoringServerBuilder : IAuthoringServerBuilder
    {
        public TestAuthoringServerBuilder(IConfiguration configuration)
        {
            Configuration = configuration;
            Services = new ServiceCollection();
        }

        public IConfiguration Configuration { get; }

        public IServiceCollection Services { get; }
    }
}
