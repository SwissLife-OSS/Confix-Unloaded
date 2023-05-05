using Confix.Authentication.Authorization;
using Squadron;
using Xunit;
using static Confix.Authoring.Integration.Tests.Wellknown;

namespace Confix.Authoring.Integration.Tests;

public class ComponentTests : IClassFixture<MongoResource>
{
    private readonly MongoResource _mongoResource;

    public ComponentTests(MongoResource mongoResource)
    {
        _mongoResource = mongoResource;
    }

    [Fact]
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
}
