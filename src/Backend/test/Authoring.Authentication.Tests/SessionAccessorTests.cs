using Moq;
using Xunit;
using System.Collections.Immutable;
using System.Security.Claims;
using Confix.Authentication.ApiKey;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using FluentAssertions;
using Snapshooter.Xunit;

namespace Confix.Authentication.Authorization.Tests;

public class SessionAccessorTests
{
    [Fact]
    public async Task GetGroupsAsync_WhenUserNotAuthenticated_ReturnsNull()
    {
        // Arrange
        var user = new ClaimsPrincipal();
        var groupProviderMock = new Mock<IGroupProvider>(MockBehavior.Strict);
        var apiKeyProviderMock = new Mock<IApiKeyProvider>(MockBehavior.Strict);
        var roleProviderMock = new Mock<IRoleProvider>(MockBehavior.Strict);

        var sessionAccessor = new SessionAccessor(
            new HttpContextAccessor { HttpContext = new DefaultHttpContext() },
            groupProviderMock.Object,
            apiKeyProviderMock.Object,
            roleProviderMock.Object);

        // Act
        var result = await sessionAccessor.GetSession(default);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetGroupsAsync_WhenApiKeyNotValid_ReturnsNull()
    {
        // Arrange
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim(JwtClaimTypes.Subject, "some-sub"),
            new Claim(ApiKeyDefaults.ApiKeyClaim, Guid.NewGuid().ToString())
        }, "test"));
        var groupProviderMock = new Mock<IGroupProvider>();
        var apiKeyProviderMock = new Mock<IApiKeyProvider>();
        apiKeyProviderMock
            .Setup(x => x.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .Returns(Task.FromResult<ApiKey.ApiKey?>(null));
        var roleProviderMock = new Mock<IRoleProvider>();

        var sessionAccessor = new SessionAccessor(
            new HttpContextAccessor { HttpContext = new DefaultHttpContext { User = user } },
            groupProviderMock.Object,
            apiKeyProviderMock.Object,
            roleProviderMock.Object);

        // Act
        var result = await sessionAccessor.GetSession(default);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetSession_WithValidAPIToken_ReturnsSession()
    {
        // Arrange
        var apiKey = Guid.Parse("c084b040-cc25-4088-93dc-50e1a0326539");
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[] {
            new Claim(JwtClaimTypes.Subject, "some-sub"),
            new Claim(ApiKeyDefaults.ApiKeyClaim, apiKey.ToString())
            }, "mock"));

        var groupProviderMock = new Mock<IGroupProvider>();
        var apiKeyProviderMock = new Mock<IApiKeyProvider>();
        var roleProviderMock = new Mock<IRoleProvider>();

        var sessionAccessor = new SessionAccessor(
            new HttpContextAccessor { HttpContext = new DefaultHttpContext { User = user } },
            groupProviderMock.Object,
            apiKeyProviderMock.Object,
            roleProviderMock.Object);

        apiKeyProviderMock
            .Setup(mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ApiKey.ApiKey(
                apiKey,
                "Some-Key",
                "hashihash",
                "h",
                new HashSet<RoleScope>(new[] { new RoleScope("NameSpace", Array.Empty<Guid>()) }).ToImmutableHashSet()
            ));

        // Act
        var result = await sessionAccessor.GetSession(CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.MatchSnapshot();

        apiKeyProviderMock.Verify(
            mock => mock.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()),
            Times.Once);
        groupProviderMock.Verify(
            mock => mock.GetGroupsOfUserAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }


    [Fact]
    public async Task GetSession_WithValidUserClaims_ReturnsSession()
    {
        // Arrange
        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim(JwtClaimTypes.Subject, "some-sub"),
            new Claim(JwtClaimTypes.Name, "John"),
            new Claim(JwtClaimTypes.Email, "john@example.com")
        }, "mock"));

        var groupProviderMock = new Mock<IGroupProvider>();
        var apiKeyProviderMock = new Mock<IApiKeyProvider>();
        var roleProviderMock = new Mock<IRoleProvider>();

        var sessionAccessor = new SessionAccessor(
            new HttpContextAccessor { HttpContext = new DefaultHttpContext { User = user } },
            groupProviderMock.Object,
            apiKeyProviderMock.Object,
            roleProviderMock.Object);

        groupProviderMock
            .Setup(mock => mock.GetGroupsOfUserAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<Group> {
                new Group(Guid.Empty,
                    "Some Group",
                    ImmutableHashSet<Requirement>.Empty,
                    ImmutableHashSet<RoleScope>.Empty)
            });

        roleProviderMock
            .Setup(mock => mock.GetRoleMapAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Dictionary<Guid, Role> {
                { Guid.Empty, new Role(Guid.Empty, "some", Array.Empty<Permission>()) }
            });

        // Act
        var result = await sessionAccessor.GetSession(CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.MatchSnapshot();

        groupProviderMock.Verify(mock => mock.GetGroupsOfUserAsync(It.IsAny<ClaimsPrincipal>(), It.IsAny<CancellationToken>()), Times.Once);
        roleProviderMock.Verify(mock => mock.GetRoleMapAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
