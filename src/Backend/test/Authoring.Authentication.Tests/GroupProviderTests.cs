
using System.Collections.Immutable;
using System.Security.Claims;
using FluentAssertions;
using IdentityModel;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using Xunit;

namespace Confix.Authentication.Authorization.Tests;

public class GroupProviderTests
{
    private const string TEST_SUB = "some-test-sub";

    [Fact]
    public async Task GetGroupsOfUserAsync_EmptyCache_CorrectResult()
    {
        // arrange
        IMemoryCache cache = new MemoryCache(new MemoryCacheOptions());
        Mock<IGroupStore> groupStoreMock = new();
        groupStoreMock
            .Setup(m => m.GetAllAsync(default))
            .ReturnsAsync(GetSampleGroups());
        GroupProvider provider = new(cache, groupStoreMock.Object);

        ClaimsPrincipal samplePrincipal = GetClaimsPrinciple();

        // act
        IReadOnlyList<Group> result = await provider.GetGroupsOfUserAsync(samplePrincipal, default);

        // assert
        result.Should().HaveCount(1);
        groupStoreMock
            .Verify(m => m.GetAllAsync(default), Times.Once);
    }

    [Fact]
    public async Task GetGroupsOfUserAsync_EmptyCache_SecondCallToCache()
    {
        // arrange
        IMemoryCache cache = new MemoryCache(new MemoryCacheOptions());
        Mock<IGroupStore> groupStoreMock = new();
        groupStoreMock
            .Setup(m => m.GetAllAsync(default))
            .ReturnsAsync(GetSampleGroups());
        GroupProvider provider = new(cache, groupStoreMock.Object);

        ClaimsPrincipal samplePrincipal = GetClaimsPrinciple();

        await provider.GetGroupsOfUserAsync(samplePrincipal, default);

        // act
        IReadOnlyList<Group> result = await provider.GetGroupsOfUserAsync(samplePrincipal, default);

        // assert
        result.Should().HaveCount(1);
        groupStoreMock
            .Verify(m => m.GetAllAsync(default), Times.Once);
    }

    private ClaimsPrincipal GetClaimsPrinciple()
    {
        var claims = new List<Claim>()
        {
            new Claim(JwtClaimTypes.Subject, TEST_SUB),
        };
        ClaimsIdentity identity = new(claims, "TestAuthType");
        return new ClaimsPrincipal(identity);
    }
    private Group[] GetSampleGroups()
    {
        return new[]{
            new Group(
                Guid.Parse("21088B78-F178-4AFC-8847-85801618B3E2"),
                "Group 1",
                ImmutableHashSet.Create<Requirement>(
                    new ClaimRequirement(JwtClaimTypes.Subject, TEST_SUB)),
                ImmutableHashSet<RoleScope>.Empty
            ),
            new Group(
                Guid.Parse("76C6CBA7-A71B-4653-BDBA-61BA4C3D335C"),
                "Group 2",
                ImmutableHashSet.Create<Requirement>(
                    new ClaimRequirement(JwtClaimTypes.Subject, "some-other-sub")),
                ImmutableHashSet<RoleScope>.Empty
            )
        };
    }
}
