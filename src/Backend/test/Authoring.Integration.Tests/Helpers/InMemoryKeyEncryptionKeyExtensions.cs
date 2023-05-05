using System.Collections.Concurrent;
using System.Security.Cryptography;
using Confix.Common;
using Confix.CryptoProviders;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Confix.Authoring.Integration.Tests;

public static class InMemoryKeyEncryptionKeyExtensions
{
    public static ICryptoProviderDescriptor UseInMemoryKeyEncryptionKeys(
        this ICryptoProviderDescriptor services)
    {
        services.Services.AddSingleton<IEncryptionKeyProvider, EncryptionKeyProvider>();
        services.Services.AddSingleton<EncryptionKeyCryptoProvider>();
        services.Services
            .AddSingleton<IEncryptor>(sp => sp.GetRequiredService<EncryptionKeyCryptoProvider>());
        services.Services
            .AddSingleton<IDecryptor>(sp => sp.GetRequiredService<EncryptionKeyCryptoProvider>());

        return services;
    }

    public class EncryptionKeyProvider : IEncryptionKeyProvider
    {
        private readonly ConcurrentDictionary<string, byte[]> _keys = new();

        /// <inheritdoc />
        public ValueTask<byte[]> GetKeyAsync(string topic, CancellationToken cancellationToken)
        {
            return new(_keys.GetOrAdd(topic, _ => RandomNumberGenerator.GetBytes(32)));
        }
    }
}
