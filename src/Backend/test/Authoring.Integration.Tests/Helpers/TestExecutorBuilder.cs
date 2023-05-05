using System.Security.Claims;
using Confix.Authoring.Messaging;
using Confix.Common;
using Confix.CryptoProviders;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Squadron;

namespace Confix.Authoring.Integration.Tests;

public class TestExecutorBuilder
{
    private readonly ServiceCollection _services;
    private readonly List<Action<IServiceCollection>> _configureServices = new();
    private readonly IConfigurationBuilder _configurationBuilder;
    private List<Claim>? _claims;
    private List<Func<IServiceProvider, Task>> _setups = new();
    private Accessor<ITestClient>? _clientAccessor;

    public TestExecutorBuilder()
    {
        _services = new ServiceCollection();
        _configurationBuilder = new ConfigurationBuilder();
    }

    public TestExecutorBuilder AddDatabase(string connectionString)
    {
        _configurationBuilder.AddInMemoryCollection(new Dictionary<string, string?>
        {
            [$"{Settings.Confix.Authoring.Database.Mongo.Section}:DatabaseName"] =
                $"Confix_{Guid.NewGuid():N}",
            [$"{Settings.Confix.Authoring.Database.Mongo.Section}:ConnectionString"] =
                connectionString,
            [$"{Settings.Confix.Encryption.DataEncryptionKey.Mongo.Section}:DatabaseName"] =
                $"Confix_{Guid.NewGuid():N}",
            [$"{Settings.Confix.Encryption.DataEncryptionKey.Mongo.Section}:ConnectionString"] =
                connectionString
        });

        return this;
    }

    public TestExecutorBuilder AddClient(out Accessor<ITestClient> clientAccessor)
    {
        _clientAccessor = new Accessor<ITestClient>(null!);
        clientAccessor = _clientAccessor;
        return this;
    }

    public TestExecutorBuilder AddClaim(string type, string value)
    {
        _claims ??= new List<Claim>();

        _claims.Add(new Claim(type, value));
        return this;
    }

    public TestExecutorBuilder Setup(Func<IServiceProvider, Task> setup)
    {
        _setups.Add(setup);
        return this;
    }

    public async Task<IRequestExecutor> Build()
    {
        _services.AddSingleton<IConfiguration>(_configurationBuilder.Build());
        _services
            .AddConfixAuthoringServer()
            .UseMongoDbStores()
            .AddVaultHttpClient()
            .ConfigureMessaging(x => x.UseInMemory())
            .ConfigureEncryption(descriptor => descriptor
                .UseInMemoryKeyEncryptionKeys()
                .UseMongoDbDataEncryptionKeys());

        _services.AddGraphQLServer().ModifyRequestOptions(x => x.OnlyAllowPersistedQueries = false);

        if (_claims is not null)
        {
            var claimsPrincipal = new ClaimsPrincipal(new ClaimsIdentity(_claims, "test"));
            var contextAccessorMock = new Mock<IHttpContextAccessor>();
            var httpContext = new DefaultHttpContext { User = claimsPrincipal };
            contextAccessorMock.SetupGet(x => x.HttpContext).Returns(httpContext);

            _services.AddSingleton(contextAccessorMock.Object);
        }

        if (_clientAccessor is not null)
        {
            _services.AddTestClient().ConfigureInMemoryClient();
        }

        var serviceProvider = _services.BuildServiceProvider();
        if (_clientAccessor is not null)
        {
            _clientAccessor.Value = serviceProvider.GetRequiredService<ITestClient>();
        }

        foreach (var setup in _setups)
        {
            await setup(serviceProvider);
        }

        return await serviceProvider
            .GetRequiredService<IRequestExecutorResolver>()
            .GetRequestExecutorAsync();
    }

    public class Accessor<T>
    {
        public Accessor(T value)
        {
            Value = value;
        }

        public T Value { get; set; }
    }

    public static TestExecutorBuilder New() => new();
}
