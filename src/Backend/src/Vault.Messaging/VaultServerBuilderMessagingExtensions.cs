using Confix.Common;
using Confix.Messaging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Vault.Messaging;

public static class VaultServerBuilderMessagingExtensions
{
    public static IVaultServerBuilder ConfigureMessaging(
        this IVaultServerBuilder builder,
        Action<IMessagingBuilder> configure)
    {
        builder.Services.ConfigureMessaging(Configure);

        return builder;

        void Configure(IMessagingBuilder messagingBuilder)
        {
            var environmentName = builder.Services.GetEnvironmentName();

            messagingBuilder.Configurator
                .AddConsumer<CreateVaultConfigConsumer>()
                .Endpoint(
                    x => x.Name = $"{RequestClients.CreateVaultConfig}-{environmentName}");

            configure(messagingBuilder);
        }
    }

    private static string GetEnvironmentName(this IServiceCollection collection)
    {
        // yes i know, it makes me sad too. But Masstransit doesnt seems to have a configuration api
        // that can make use of IServiceProvider. Therefore we do not have access to IConfiguration
        // and also not to IOptions.
        return collection
            .BuildServiceProvider()
            .GetRequiredService<IConfiguration>()
            .GetValue<string>(Settings.Confix.Vault.Environment.Name.Value)!;
    }
}
