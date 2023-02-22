using Xunit;

namespace Confix.Value.Configuration;

public class KeyVaultVariableCryptoProviderTests
{
    [Fact(Skip = "Needs an actual KeyVault in Azure to run")]
    public Task EncryptAndDecrypt_WithDefaultKeyId_DecryptedValueEqualsPlainTextValue()
    {
        return Task.CompletedTask;
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
