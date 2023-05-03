using System.Collections.Immutable;
using FluentAssertions;
using Snapshooter;
using Snapshooter.Xunit;
using Xunit;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authentication.Authorization.Tests;

public class SessionTests
{
    [Fact]
    public void GetNamespacesWithAccess_ApplicationReadAsDeveloper_MatchSnapshot()
    {
        // Arrange
        ISession session = CreateDeveloperSession();

        // Act
        var result = session.GetNamespacesWithAccess(Scope.Application, Read);

        // Assert
        result.Should().BeEquivalentTo(new[]{
            "CompanyNamespace",
            "Project1Namespace",
            "Project2Namespace"
        });
    }

    [Fact]
    public void GetNamespacesWithAccess_IdentityReadAsDeveloper_None()
    {
        // Arrange
        ISession session = CreateDeveloperSession();

        // Act
        var result = session.GetNamespacesWithAccess(Scope.Identity, Read);

        // Assert
        result.Should().BeEmpty();
    }

    [Fact]
    public void GetNamespacesWithAccess_IdentityReadAsBigBoss_CorrectElements()
    {
        // Arrange
        ISession session = CreateBigBossSession();

        // Act
        var result = session.GetNamespacesWithAccess(Scope.Identity, Read);

        // Assert
        result.Should().BeEquivalentTo(new[]{
            "CompanyNamespace",
            "SuperImportant",
            "Project1Namespace",
            "Project2Namespace"
        });
    }

    [Fact]
    public void HasPermission_UnknownNamespace_ReturnFalse()
    {
        // Arrange
        ISession session = CreateDeveloperSession();

        // Act
        var result = session.HasPermission("cookie-namespace", Scope.Application, Read);

        // Assert
        result.Should().BeFalse();
    }

    [Fact]
    public void HasPermission_NamespaceWithRead_WritePermissionFalse()
    {
        // Arrange
        ISession session = CreateDeveloperSession();

        // Act
        var result = session.HasPermission("CompanyNamespace", Scope.Application, Write);

        // Assert
        result.Should().BeFalse();
    }

    [Fact]
    public void HasPermission_NamespaceWithRead_ReadPermissionTrue()
    {
        // Arrange
        ISession session = CreateDeveloperSession();

        // Act
        var result = session.HasPermission("CompanyNamespace", Scope.Application, Read);

        // Assert
        result.Should().BeTrue();
    }

    [Theory]
    [InlineData(Scope.Configuration)]
    [InlineData(Scope.Application)]
    [InlineData(Scope.Variable)]
    [InlineData(Scope.Identity)]
    [InlineData(Scope.Component)]
    public void GetGrantsForScope_ForScope_MatchSnapshot(Scope scope)
    {
        // Arrange
        ISession session = CreateBigBossSession();

        // Act
        IReadOnlySet<Grant> result = session.GetGrantsForScope(scope);

        // Assert
        result
            .OrderBy(g => g.Namespace)
            .MatchSnapshot(SnapshotNameExtension.Create(scope.ToString()));
    }

    private ISession CreateDeveloperSession()
    {
        var userInfo = new UserInfo("some-id", "Super Dev", "my-mail");
        List<Group> groups = new(){
            new Group(
                Guid.Parse("dbd1e581-042e-4d7a-be5f-c4040e3cc579"),
                "Developer-Project1",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "CompanyNamespace",
                        new[]{
                            DeveloperRead.Id,
                        }),
                    new RoleScope(
                        "Project1Namespace",
                        new[]{
                            DeveloperRead.Id,
                            DeveloperReadWrite.Id,
                        })
            )),
            new Group(
                Guid.Parse("a634534b-34b3-4a9e-9898-27f9708cc92b"),
                "Developer-Project2",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "CompanyNamespace",
                        new[]{
                            DeveloperRead.Id,
                        }),
                    new RoleScope(
                        "Project2Namespace",
                        new[]{
                            DeveloperRead.Id,
                            DeveloperReadWrite.Id,
                        })
            )),
        };

        return new Session(userInfo, groups, RoleMap);
    }

    private ISession CreateBigBossSession()
    {
        var userInfo = new UserInfo("some-id", "The Big Boss", "my-mail");
        List<Group> groups = new(){
            new Group(
                Guid.Parse("8dd4e583-7862-4479-8f34-16fd23e9eb15"),
                "Chef",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "CompanyNamespace",
                        new[]{
                           Admin.Id,
                           IdentityAdmin.Id
                        }),
                    new RoleScope(
                        "SuperImportant",
                        new[]{
                           Admin.Id,
                           IdentityAdmin.Id
                        }),
                    new RoleScope(
                        "Project1Namespace",
                        new[]{
                            Admin.Id,
                            IdentityAdmin.Id
                        }),
                    new RoleScope(
                        "Project2Namespace",
                        new[]{
                            Admin.Id,
                            IdentityAdmin.Id
                        })
                )),
            new Group(
                Guid.Parse("dbd1e581-042e-4d7a-be5f-c4040e3cc579"),
                "Developer-Project1",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "CompanyNamespace",
                        new[]{
                            DeveloperRead.Id,
                        }),
                    new RoleScope(
                        "Project1Namespace",
                        new[]{
                            DeveloperRead.Id,
                            DeveloperReadWrite.Id,
                        })
            )),
            new Group(
                Guid.Parse("a634534b-34b3-4a9e-9898-27f9708cc92b"),
                "Developer-Project2",
                ImmutableHashSet<Requirement>.Empty,
                ImmutableHashSet.Create(
                    new RoleScope(
                        "CompanyNamespace",
                        new[]{
                            DeveloperRead.Id,
                        }),
                    new RoleScope(
                        "Project2Namespace",
                        new[]{
                            DeveloperRead.Id,
                            DeveloperReadWrite.Id,
                        })
            )),
        };

        return new Session(userInfo, groups, RoleMap);
    }

    private readonly IReadOnlyDictionary<Guid, Role> RoleMap = new[] {
            DeveloperRead,
            DeveloperReadWrite,
            ApplicationClaim,
            Admin,
            IdentityAdmin
        }.ToImmutableDictionary(x => x.Id);

    private static readonly Role DeveloperRead = new(
           Guid.Parse("6435ed99-43ff-40c2-b1bc-6b439563b84b"),
           "DeveloperRead",
           new[] {
            new Permission(Scope.Application, Read),
            new Permission(Scope.Configuration, Read),
            new Permission(Scope.Component, Read),
            new Permission(Scope.Variable, Read)
           }
    );

    private static readonly Role DeveloperReadWrite = new(
        Guid.Parse("a5ca4dc1-9fc3-499a-b7e3-6dc0a6f4c009"),
        "DeveloperReadWrite",
        new[] {
            new Permission(Scope.Application, Read | Write),
            new Permission(Scope.Configuration, Read | Write),
            new Permission(Scope.Component, Read | Write),
            new Permission(Scope.Variable, Read | Write)
        }
    );


    private static readonly Role ApplicationClaim = new(
        Guid.Parse("4172ca74-0999-4747-8f62-8074c2ca0f52"),
        "Claim",
        new[] {
            new Permission(Scope.Application, Claim)
        }
    );

    private static readonly Role Admin = new(
       Guid.Parse("4fc464f2-c0b8-4349-b3e4-b3c214e2bb81"),
       "Admin",
       new[] {
            new Permission(Scope.Application, Read | Write | Claim | Publish),
            new Permission(Scope.Configuration, Read | Write),
            new Permission(Scope.Component, Read | Write),
            new Permission(Scope.Variable, Read | Write | Decrypt)
       }
   );

    private static readonly Role IdentityAdmin = new(
       Guid.Parse("4552f635-4804-4328-a69b-7fae84f0b8c4"),
       "IdentityAdmin",
       new[] {
            new Permission(Scope.Identity,Read | Write)
       }
   );
}
