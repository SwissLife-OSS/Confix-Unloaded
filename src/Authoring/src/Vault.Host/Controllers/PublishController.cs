using System.Text.Json;
using Confix.Vault.Abstractions;
using Confix.Vault.Core;
using Microsoft.AspNetCore.Mvc;
using Vault.Host.Models;

namespace Vault.Host.Controllers;

[ApiController]
[Route("[controller]")]
public class PublishController : ControllerBase
{
    private readonly IConfigurationService _service;

    public PublishController(IConfigurationService service)
    {
        _service = service;
    }

    [HttpPut]
    public async Task<PutConfigurationResponse> Put(
        [FromBody] PutConfigurationRequest request,
        CancellationToken cancellationToken)
    {
        string apiKey = await _service.CreateAsync(
            request.ApplicationName,
            request.ApplicationPartName,
            request.EnvironmentName,
            request.Configuration,
            cancellationToken);

        return new PutConfigurationResponse(apiKey);
    }

    [HttpGet]
    public async Task<GetConfigurationResponse> Get(
        [FromQuery] string applicationName,
        [FromQuery] string applicationPartName,
        [FromQuery] string environmentName,
        [FromQuery] string apiKey,
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

        if (string.IsNullOrEmpty(apiKey))
        {
            return GetConfigurationResponse.FromError(nameof(apiKey) + " must be provided");
        }

        JsonDocument? configuration = await _service.GetAsync(
            applicationName,
            applicationPartName,
            environmentName,
            apiKey,
            cancellationToken);

        if (configuration is null)
        {
            return GetConfigurationResponse.FromError("Configuration was not found");
        }

        return GetConfigurationResponse.FromSuccess(configuration);
    }
}
