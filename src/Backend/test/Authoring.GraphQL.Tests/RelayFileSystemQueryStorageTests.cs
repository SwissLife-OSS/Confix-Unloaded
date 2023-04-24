using FluentAssertions;
using Xunit;

namespace Confix.Authoring.GraphQL.Tests;

public class RelayFileSystemQueryStorageTests
{
    [Fact]
    public async Task TryReadQueryAsync_InvalidId_MatchSnapshot()
    {
        // arrange
        RelayFileSystemQueryStorage storage = new();

        // act
        var result = await storage.TryReadQueryAsync("not-a-valid-hash");

        // assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task TryReadQueryAsync_ValidId_Found()
    {
        // arrange
        RelayFileSystemQueryStorage storage = new();

        // act
        var result = await storage.TryReadQueryAsync("06c87499a5a33976e7fd59a237608650");

        // assert
        result.Should().NotBeNull();
    }
}
