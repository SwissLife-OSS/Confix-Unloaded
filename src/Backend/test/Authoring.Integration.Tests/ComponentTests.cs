using Confix.Authentication.Authorization;
using Squadron;
using Snapshooter;
using Xunit;
using static Confix.Authoring.Integration.Tests.Wellknown;
using Snapshooter.Xunit;

namespace Confix.Authoring.Integration.Tests;

public class ComponentTests : IClassFixture<MongoResource>
{
    private readonly MongoResource _mongoResource;

    public ComponentTests(MongoResource mongoResource)
    {
        _mongoResource = mongoResource;
    }

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
        result.Data!.Components!.Nodes.MatchSnapshot();
    }

    [Fact]
    public async Task ComponentById_Should_OnlyReturnComponentsWithReadPermission()
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
                    Scopes = new[] { new ComponentScope(Namespaces.Other, null, null) }
                }))
            .Build();

        // act
        var result = await client.Value.GetComponents.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        Assert.Equal(1, result.Data!.Components!.Nodes!.Count);
    }
}
