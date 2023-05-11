using Confix.Authentication.Authorization;
using HotChocolate.Types.Relay;
using static Confix.Authoring.Integration.Tests.Wellknown;

namespace Confix.Authoring.Integration.Tests;

public class ComponentTests : IClassFixture<MongoResource>
{
    private readonly MongoResource _mongoResource;

    public ComponentTests(MongoResource mongoResource)
    {
        _mongoResource = mongoResource;
    }

    #region Components without filter

    [Fact]
    public async Task Components_Should_ReturnAllComponents()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with { Id = Guid.Parse("10000000-0000-0000-0000-000000000000"), Name = "Component 1" })
                .AddComponent(x => x with { Id = Guid.Parse("20000000-0000-0000-0000-000000000000"), Name = "Component 2" }))
            .Build();

        // act
        var result = await client.Value.GetComponents.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(2);
    }

    [Fact]
    public async Task Component_Should_OnlyReturnComponentsWithReadPermission()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Other, Scope.Application, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with { Id = Guid.Parse("10000000-0000-0000-0000-000000000000"), Name = "Component 1" })
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("20000000-0000-0000-0000-000000000000"),
                    Name = "Component 2",
                    Namespace = Namespaces.Other
                }))
            .Build();

        // act
        var result = await client.Value.GetComponents.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(1);
    }
    #endregion

    #region Components With Filter

    [Fact]
    public async Task ComponentsFilter_Search_ReturnAllMatchingComponents()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with { Id = Guid.Parse("10000000-0000-0000-0000-000000000000"), Name = "Search1Component" })
                .AddComponent(x => x with { Id = Guid.Parse("20000000-0000-0000-0000-000000000000"), Name = "Search2Component" }))
            .Build();

        // act
        var result = await client.Value.GetComponentsWithFilter.ExecuteAsync(null, "Search1");

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(1);
    }

    [Fact]
    public async Task ComponentsFilter_Search_EmptyResponseWhenNoNameMatches()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with { Id = Guid.Parse("10000000-0000-0000-0000-000000000000"), Name = "Search1Component" })
                .AddComponent(x => x with { Id = Guid.Parse("20000000-0000-0000-0000-000000000000"), Name = "Search2Component" }))
            .Build();

        // act
        var result = await client.Value.GetComponentsWithFilter.ExecuteAsync(null, "No-Match");

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Should().BeEmpty();
    }

    [Fact]
    public async Task ComponentsFilter_SearchPartialMatch_ReturnsAllMatching()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with { Id = Guid.Parse("10000000-0000-0000-0000-000000000000"), Name = "Search1Component" })
                .AddComponent(x => x with { Id = Guid.Parse("20000000-0000-0000-0000-000000000000"), Name = "Search2Component" }))
            .Build();

        // act
        var result = await client.Value.GetComponentsWithFilter.ExecuteAsync(null, "Comp");

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(2);
    }

    #endregion


    #region ComponentById

    [Fact]
    public async Task ComponentById_ValidId_ReturnsComponent()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();
        string relayId = new IdSerializer().Serialize(nameof(Component), Wellknown.Component.Id)!;

        // act
        var result = await client.Value.GetComponentById.ExecuteAsync(relayId);

        // assert
        result.AssertNoErrors();
        result.Data!.ComponentById.MatchSnapshot();
    }

    [Fact]
    public async Task ComponentById_InvalidId_ReturnsNull()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();
        string relayId = new IdSerializer().Serialize(nameof(Component), Guid.NewGuid())!;

        // act
        var result = await client.Value.GetComponentById.ExecuteAsync(relayId);

        // assert
        result.AssertNoErrors();
        result.Data!.ComponentById.Should().BeNull();
    }

    [Fact]
    public async Task ComponentById_NoPermission_ReturnsNull()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Other, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();
        string relayId = new IdSerializer().Serialize(nameof(Component), Wellknown.Component.Id)!;

        // act
        var result = await client.Value.GetComponentById.ExecuteAsync(relayId);

        // assert
        result.AssertNoErrors();
        result.Data!.ComponentById.Should().BeNull();
    }

    #endregion


    #region
    // TODO: mutations
    #endregion

}
