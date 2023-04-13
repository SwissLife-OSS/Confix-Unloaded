using Microsoft.Extensions.Caching.Memory;
using Moq;
using Xunit;

namespace Confix.Authentication.Authorization.Tests;

public class RoleProviderTests
{
    [Fact]
    public async Task GetRoleMapAsync_EmptyCache_ReturnsRolesFromStore()
    {
        // Arrange
        var cache = new MemoryCache(new MemoryCacheOptions());
        var roleStore = new Mock<IRoleStore>();
        var roleProvider = new RoleProvider(cache, roleStore.Object);

        var rolesFromStore = new[]
        {
            new Role(
                Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20"),
                "Default",
                new[]
                {
                    new Permission(Scope.Environment, Permissions.Read)
                })
        };
        roleStore
            .Setup(rs => rs.GetAllAsync(default))
            .ReturnsAsync(rolesFromStore);

        // Act
        var result = await roleProvider.GetRoleMapAsync(default);

        // Assert
        Assert.Equal(rolesFromStore, result.Values);
        roleStore.Verify(rs => rs.GetAllAsync(default), Times.Once);
    }

    [Fact]
    public async Task GetRoleMapAsync_CacheNotEmpty_ReturnsRolesFromCache()
    {
        // Arrange
        var cancellationToken = CancellationToken.None;
        var cache = new MemoryCache(new MemoryCacheOptions());
        var roleStore = new Mock<IRoleStore>();
        var roleProvider = new RoleProvider(cache, roleStore.Object);

       var rolesFromStore = new[]
        {
            new Role(
                Guid.Parse("63C30F32-DEB1-4DFC-8D19-CD7767CE5A20"),
                "Default",
                new[]
                {
                    new Permission(Scope.Environment, Permissions.Read)
                })
        };
        roleStore
            .Setup(rs => rs.GetAllAsync(cancellationToken))
            .ReturnsAsync(rolesFromStore);

       // Act
        var result1 = await roleProvider.GetRoleMapAsync(cancellationToken);
        var result2 = await roleProvider.GetRoleMapAsync(cancellationToken);

        // Assert
        Assert.Equal(result1, result2);
        roleStore.Verify(rs => rs.GetAllAsync(cancellationToken), Times.Once);
    }
}
