using Confix.Messaging;
using Confix.Vault.Abstractions;
using MassTransit;

namespace Confix.Vault.Messaging;

public class CreateVaultConfigConsumer : IConsumer<CreateVaultConfigRequest>
{
    private readonly IConfigurationService _service;

    public CreateVaultConfigConsumer(IConfigurationService service)
    {
        _service = service;
    }

    public async Task Consume(ConsumeContext<CreateVaultConfigRequest> context)
    {
        var token = await _service.CreateAsync(
            context.Message.ApplicationName,
            context.Message.ApplicationPartName,
            context.Message.EnvironmentName,
            context.Message.Configuration,
            context.CancellationToken);

        await context.RespondAsync<CreateVaultConfigResponse>(new(
            context.Message.ApplicationName,
            context.Message.ApplicationPartName,
            context.Message.EnvironmentName,
            token.AccessToken,
            token.RefreshToken));
    }
}
