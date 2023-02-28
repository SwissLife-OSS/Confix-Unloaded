using Confix.Messaging;

namespace Confix.Authoring.Messaging;

public interface ICreateVaultConfigClient
{
    Task<CreateVaultConfigResponse> ExecuteAsync(
        CreateVaultConfigRequest request,
        CancellationToken cancellationToken);
}
