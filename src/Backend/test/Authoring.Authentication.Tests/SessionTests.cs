using System.Collections.Immutable;
using Xunit;

namespace Confix.Authentication.Authorization.Tests;

public class SessionTests
{
    private readonly UserInfo DEFAULT_USERINFO = new("some-id", "some-name", "my-mail");

    [Fact]
    public void TestName()
    {
        // Arrange

        // Act

        // Assert
    }

    private Session CreateDeveloperSession()
    {
        var userInfo = new UserInfo("some-id", "some-name", "my-mail");
        List<Group> groups = new(){
            new Group(
                Guid.Parse("dbd1e581-042e-4d7a-be5f-c4040e3cc579"),
                "Developer",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "SomeNamespace",
                        new[]{
                            ApplicationReadWrite.Id
                        })
                ))
        };
    }

    private Role ApplicationReadWrite => new(
        Guid.Parse("a5ca4dc1-9fc3-499a-b7e3-6dc0a6f4c009"),
        "ApplicationReadWrite",
        new[] { new Permission(Scope.Application, Permissions.Read & Permissions.Write) }
    );
}
