using Confix.Messaging;
using MassTransit;

namespace Confix.Authoring.Messaging;

internal sealed class CreateVaultConfigClient : ICreateVaultConfigClient
{
    private readonly IBus _bus;
    private readonly IMessagingUrlFactory _urlFactory;

    public CreateVaultConfigClient(IBus bus, IMessagingUrlFactory urlFactory)
    {
        _bus = bus;
        _urlFactory = urlFactory;
    }

    public async Task<CreateVaultConfigResponse> ExecuteAsync(
        CreateVaultConfigRequest request,
        CancellationToken cancellationToken)
    {
        var uri = _urlFactory
            .CreateRequestClientUrl(RequestClients.CreateVaultConfig, request.EnvironmentName);

        var client = _bus.CreateRequestClient<CreateVaultConfigRequest>(uri);

        var response =
            await client.GetResponse<CreateVaultConfigResponse>(request, cancellationToken);

        return response.Message;
    }
}
