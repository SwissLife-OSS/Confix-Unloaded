using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring;
using Confix.CryptoProviders;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace ConfiX;

public class KeyVaultVariableCryptoProviderTests
{
    [Fact(Skip = "Needs an actual KeyVault in Azure to run")]
    public async Task EncryptAndDecrypt_WithDefaultKeyId_DecryptedValueEqualsPlainTextValue()
    {
        /*// Arrange
        IConfixServerBuilder? builder = TestContext.GetBuilder();
        builder.AddAzureKeyvaultCrypto();

        ServiceProvider sp = builder.Services.BuildServiceProvider();

        IEncryptor provider = sp.GetRequiredService<IEncryptor>();
        string plainTextValue = "SecretMessage";

        // Act
        ValueEncryptionResult encrypted = await provider
            .EncryptAsync(plainTextValue, CancellationToken.None);

        string reverse = await provider.DecryptAsync(
            encrypted.CipherValue,
            encrypted.EncryptionInfo,
            CancellationToken.None);

        // Assert
        plainTextValue.Should().Be(reverse);*/
    }
}
