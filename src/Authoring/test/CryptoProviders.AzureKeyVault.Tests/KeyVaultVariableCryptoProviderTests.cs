using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring;
using Confix.CryptoProvider.AzureKeyVault;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace ConfiX
{
    public class KeyVaultVariableCryptoProviderTests
    {
        [Fact(Skip = "Needs an actual KeyVault in Azure to run")]
        public async Task EncryptAndDecrypt_WithDefaultKeyId_DecryptedValueEqualsPlainTextValue()
        {
            // Arrange
            IConfixServerBuilder? builder = TestContext.GetBuilder();
            builder.AddAzureKeyVaultCryptoProvider();

            ServiceProvider sp = builder.Services.BuildServiceProvider();

            IVariableCryptoProvider provider = sp.GetRequiredService<IVariableCryptoProvider>();
            string plainTextValue = "SecretMessage";

            // Act
            ValueEncryptionResult encrypted = await provider
                .EncryptAsync(plainTextValue, CancellationToken.None);

            string reverse = await provider.DecryptAsync(
                encrypted.CipherValue,
                encrypted.EncryptionInfo,
                CancellationToken.None);

            // Assert
            plainTextValue.Should().Be(reverse);
        }
    }
}
