using Confix.Messaging;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Messaging;

public static class AuthoringServerBuilderMessagingExtensions
{
    public static IAuthoringServerBuilder ConfigureMessaging(
        this IAuthoringServerBuilder builder,
        Action<IMessagingBuilder> configure)
    {
        builder.Services.AddSingleton<ICreateVaultConfigClient, CreateVaultConfigClient>();
        builder.Services.ConfigureMessaging(Configure);

        return builder;

        void Configure(IMessagingBuilder messagingBuilder)
        {
            messagingBuilder.Configurator.AddRequestClient<CreateVaultConfigRequest>();
            configure(messagingBuilder);
        }
    }
}
