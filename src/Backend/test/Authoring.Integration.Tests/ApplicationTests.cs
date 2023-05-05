using Confix.Authentication.Authorization;
using Squadron;
using Xunit;
using static Confix.Authoring.Integration.Tests.Wellknown;

namespace Confix.Authoring.Integration.Tests;

public class ApplicationTests : IClassFixture<MongoResource>
{
    private readonly MongoResource _mongoResource;

    public ApplicationTests(MongoResource mongoResource)
    {
        _mongoResource = mongoResource;
    }

    [Fact(Skip = "TODO: Fix this test")]
    public async Task Applications_Should_ReturnAllApplications()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Default, Scope.Application, Permissions.Read)
            .AddPermission(Namespaces.Other, Scope.Application, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddApplication(x => x with { Name = "Test" })
                .AddApplication(x => x with
                {
                    Id = Guid.NewGuid(), Name = "Test2", Namespace = Namespaces.Other
                }))
            .Build();

        // act
        var result = await client.Value.GetApplications.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        Assert.Equal(2, result.Data!.Applications!.Nodes!.Count);
    }

    [Fact(Skip = "TODO: Fix this test")]
    public async Task Applications_Should_NotReturnApplications_FromOtherNamespaces()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddDefaultUser()
            .AddPermission(Namespaces.Other, Scope.Application, Permissions.Read)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddApplication(x => x with { Name = "Test" })
                .AddApplication(x => x with
                {
                    Id = Guid.NewGuid(), Name = "Test2", Namespace = Namespaces.Other
                }))
            .Build();

        // act
        var result = await client.Value.GetApplications.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        Assert.Equal(1, result.Data!.Applications!.Nodes!.Count);
    }

    [Fact(Skip = "TODO: Fix this test")]
    public async Task Applications_Should_NotReturnAnything_When_NotAuthenticated()
    {
        // arrange
        await TestExecutorBuilder
            .New()
            .AddDatabase(_mongoResource.ConnectionString)
            .AddClient(out var client)
            .SetupDb(db => db
                .AddApplication(x => x with { Name = "Test" })
                .AddApplication(x => x with
                {
                    Id = Guid.NewGuid(), Name = "Test2", Namespace = Namespaces.Other
                }))
            .Build();

        // act
        var result = await client.Value.GetApplications.ExecuteAsync();

        // assert
        result.AssertNoErrors();
        Assert.Equal(0, result.Data!.Applications!.Nodes!.Count);
    }

    [Fact(Skip = "TODO: Fix this test")]
    public async Task ApplicationById_Should_ReturnApplication_When_Authenticated()
    {
    }
}
