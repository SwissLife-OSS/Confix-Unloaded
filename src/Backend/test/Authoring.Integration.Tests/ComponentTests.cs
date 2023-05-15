using System.Text.Json;
using Confix.Authentication.Authorization;
using HotChocolate.Types.Relay;
using static Confix.Authoring.Integration.Tests.Wellknown;

namespace Confix.Authoring.Integration.Tests;

public class ComponentTests : IClassFixture<MongoReplicaSetResource>
{
    private readonly MongoReplicaSetResource _mongoResource;

    public ComponentTests(MongoReplicaSetResource mongoResource)
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

    [Fact]
    public async Task ComponentsFilter_Scopes_ReturnsAllMatching()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Other, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("10000000-0000-0000-0000-000000000000"),
                    Name = "Component1",
                    Scopes = new[] { new NamespaceComponentScope(Namespaces.Default) }
                })
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("20000000-0000-0000-0000-000000000000"),
                    Name = "Component2",
                    Scopes = new[] { new NamespaceComponentScope(Namespaces.Other) }
                })
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("30000000-0000-0000-0000-000000000000"),
                    Name = "Component3",
                    Scopes = new[] { new NamespaceComponentScope("Some Other Namespace") }
                }))
            .Build();

        // act
        var result = await client.Value.GetComponentsWithFilter.ExecuteAsync(new[]{
            new ComponentScopeInput{
                Namespace = new() {Namespace = Namespaces.Default}
            },
            new ComponentScopeInput{
                Namespace = new() {Namespace = Namespaces.Other}
            }
        }, null);

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(2);
    }

    [Fact]
    public async Task ComponentsFilter_ScopesWithSearch_ReturnsAllMatchingBoth()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Other, Scope.Component, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("10000000-0000-0000-0000-000000000000"),
                    Name = "Search1Component",
                    Scopes = new[] { new NamespaceComponentScope(Namespaces.Default) }
                })
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("20000000-0000-0000-0000-000000000000"),
                    Name = "Search3Component",
                    Scopes = new[] { new NamespaceComponentScope(Namespaces.Other) }
                })
                .AddComponent(x => x with
                {
                    Id = Guid.Parse("30000000-0000-0000-0000-000000000000"),
                    Name = "Search2Component",
                    Scopes = new[] { new NamespaceComponentScope("Some Other Namespace") }
                }))
            .Build();

        // act
        var result = await client.Value.GetComponentsWithFilter.ExecuteAsync(new[]{
            new ComponentScopeInput{
                Namespace = new() {Namespace = Namespaces.Default}
            },
            new ComponentScopeInput{
                Namespace = new() {Namespace = Namespaces.Other}
            }
        }, "Search1");

        // assert
        result.AssertNoErrors();
        result.Data!.Components!.Nodes!.Count.Should().Be(1);
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

    #region CreateComponent

    [Fact]
    public async Task CreateComponent_ReadPermission_Fail()
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

        // act
        var result = await client.Value.CreateComponent.ExecuteAsync(new CreateComponentInput
        {
            Name = "My New Component",
            Schema = """type Component { someTestField: String! }""",
            Namespace = Namespaces.Default,
            Scopes = new[] {
                new ComponentScopeInput() {
                    Namespace = new NamespaceComponentScopeInput() {
                         Namespace = Namespaces.Default
                    }
                }
            },
            Values = JsonDocument.Parse("""{"someTestField": "foo"}""")
        });

        // assert
        result.AssertNoErrors();
        result.Data!.CreateComponent.Errors.Should().HaveCount(1);
        result.Data!.CreateComponent.Errors.Should().MatchSnapshot();
        result.Data!.CreateComponent.Component.Should().BeNull();
        result.Data!.CreateComponent.Query.Components!.Nodes!.Count.Should().Be(1);
    }

    [Fact]
    public async Task CreateComponent_ValidInput_CreatesComponent()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Write)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();

        // act
        var result = await client.Value.CreateComponent.ExecuteAsync(new CreateComponentInput
        {
            Name = "My New Component",
            Schema = """type Component { someTestField: String! }""",
            Namespace = Namespaces.Default,
            Scopes = new[] {
                new ComponentScopeInput() {
                    Namespace = new NamespaceComponentScopeInput() {
                         Namespace = Namespaces.Default
                    }
                }
            },
            Values = JsonDocument.Parse("""{"someTestField": "foo"}""")
        });

        // assert
        result.AssertNoErrors();
        result.Data!.CreateComponent.Errors.Should().BeNull();
        result.Data!.CreateComponent.Component.Should().MatchSnapshot(o => o.IgnoreField("Id"));
        result.Data!.CreateComponent.Query.Components!.Nodes!.Count.Should().Be(2);
    }

    [Fact]
    public async Task CreateComponent_BrokenSchema_ReturnsError()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Write)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();

        // act
        var result = await client.Value.CreateComponent.ExecuteAsync(new CreateComponentInput
        {
            Name = "My New Component",
            Schema = """type Component { someFieldWithNonExistentType: Unicorn! }""",
            Namespace = Namespaces.Default,
            Scopes = new[] {
                new ComponentScopeInput() {
                    Namespace = new NamespaceComponentScopeInput() {
                         Namespace = Namespaces.Default
                    }
                }
            },
            Values = JsonDocument.Parse("""{"someFieldWithNonExistentType": "foo"}""")
        });

        // assert
        result.AssertNoErrors();
        result.Data!.CreateComponent.Errors.Should().HaveCount(1);
        result.Data!.CreateComponent.Errors.Should().MatchSnapshot();
        result.Data!.CreateComponent.Component.Should().BeNull();
        result.Data!.CreateComponent.Query.Components!.Nodes!.Count.Should().Be(1);
    }
    #endregion

    #region RenameComponent

    [Fact]
    public async Task RenameComponent_ReadPermission_Fails()
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
        var result = await client.Value.RenameComponent.ExecuteAsync(new RenameComponentInput
        {
            Id = relayId,
            Name = "SomeNewName",
        });

        // assert
        result.AssertNoErrors();
        result.Data!.RenameComponent.Errors!.Should().HaveCount(1);
        result.Data!.RenameComponent.Errors.Should().MatchSnapshot();
        result.Data!.RenameComponent.Component.Should().BeNull();
        result.Data!.RenameComponent.Query.Components!.Nodes!.Count.Should().Be(1);
    }

    [Fact]
    public async Task RenameComponent_ValidName_UpdatesComponent()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Read)
            .AddPermission(Namespaces.Default, Scope.Component, Permissions.Write)
            .AddClient(out var client)
            .SetupDb(db => db.AddComponent())
            .Build();
        string relayId = new IdSerializer().Serialize(nameof(Component), Wellknown.Component.Id)!;
        // act
        var result = await client.Value.RenameComponent.ExecuteAsync(new RenameComponentInput
        {
            Id = relayId,
            Name = "SomeNewName",
        });

        // assert
        result.AssertNoErrors();
        result.Data!.RenameComponent.Errors!.Should().BeNull();
        result.Data!.RenameComponent.Component!.Name.Should().Be("SomeNewName");
        result.Data!.RenameComponent.Query.Components!.Nodes!.Count.Should().Be(1);
    }
    #endregion

    #region UpdateComponentSchema
    // TODO
    #endregion

    #region UpdateComponentScopes
    // TODO
    #endregion

    #region UpdateComponentValues
    // TODO:
    #endregion
}
