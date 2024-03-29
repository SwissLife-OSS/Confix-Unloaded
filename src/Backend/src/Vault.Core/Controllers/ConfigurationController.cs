using Confix.Authentication.Authorization;
using Confix.Vault;
using Confix.Vault.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vault.Host.Configuration.Transport;

namespace Vault.Host.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class ConfigurationController : ControllerBase
{
    private readonly IConfigurationService _service;

    public ConfigurationController(IConfigurationService service)
    {
        _service = service;
    }

    [HttpPut]
    [Authorize(Policy = Policies.Names.VaultManage)]
    public async Task<PutConfigurationResponse> Put(
        [FromBody] PutConfigurationRequest request,
        CancellationToken cancellationToken)
    {
        var token = await _service.CreateAsync(
            request.ApplicationName,
            request.ApplicationPartName,
            request.EnvironmentName,
            request.Configuration,
            cancellationToken);

        return new PutConfigurationResponse(token.AccessToken, token.RefreshToken);
    }

    [HttpPatch]
    [Authorize(Policy = Policies.Names.VaultManage)]
    public async Task<RefreshConfigurationResponse> Patch(
        [FromBody] RefreshConfigurationRequest request,
        CancellationToken cancellationToken)
    {
        await _service.RefreshConfigurationAsync(
            request.ApplicationName,
            request.ApplicationPartName,
            request.EnvironmentName,
            request.Configuration,
            request.RefreshToken,
            cancellationToken);

        return new RefreshConfigurationResponse();
    }

    [HttpGet]
    public async Task<GetConfigurationResponse> Get(
        [FromQuery] string applicationName,
        [FromQuery] string applicationPartName,
        [FromQuery] string environmentName,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(applicationName))
        {
            return GetConfigurationResponse
                .FromError(nameof(applicationName) + " must be provided");
        }

        if (string.IsNullOrEmpty(applicationPartName))
        {
            return GetConfigurationResponse
                .FromError(nameof(applicationPartName) + " must be provided");
        }

        if (string.IsNullOrEmpty(environmentName))
        {
            return GetConfigurationResponse
                .FromError(nameof(environmentName) + " must be provided");
        }

        Request.Headers.TryGetValue(WellKnown.Headers.TokenHeader, out var token);

        if (string.IsNullOrEmpty(token))
        {
            return GetConfigurationResponse.FromError(nameof(token) + " must be provided");
        }

        var configuration = await _service.GetAsync(
            applicationName,
            applicationPartName,
            environmentName,
            token.ToString(),
            cancellationToken);

        if (configuration is null)
        {
            return GetConfigurationResponse.FromError("Configuration was not found");
        }

        return GetConfigurationResponse.FromSuccess(configuration);
    }
}
