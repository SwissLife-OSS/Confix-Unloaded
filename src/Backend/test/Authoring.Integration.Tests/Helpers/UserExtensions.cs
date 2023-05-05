using System.Collections.Immutable;
using System.Security.Claims;
using Confix.Authentication.Authorization;
using IdentityModel;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Integration.Tests;

public static class UserExtensions
{
    public static TestExecutorBuilder AddDefaultUser(this TestExecutorBuilder builder)
    {
        return builder.AddUser(
            Wellknown.User.Id.ToString(),
            Wellknown.User.Name,
            Wellknown.User.Email,
            Wellknown.User.Role
        );
    }

    public static TestExecutorBuilder AddOtherUser(this TestExecutorBuilder builder)
    {
        return builder.AddUser(
            Wellknown.OtherUser.Id.ToString(),
            Wellknown.OtherUser.Name,
            Wellknown.OtherUser.Email,
            Wellknown.OtherUser.Role
        );
    }

    public static TestExecutorBuilder AddPermission(
        this TestExecutorBuilder builder,
        string @namespace,
        Scope scope,
        Permissions permissions,
        string? role = null)
    {
        role ??= Wellknown.User.Role;

        builder.Setup(async sp =>
        {
            var groupId = Guid.NewGuid();
            var roleId = Guid.NewGuid();

            var groupStore = sp.GetRequiredService<IGroupStore>();
            var roleStore = sp.GetRequiredService<IRoleStore>();
            await groupStore.UpsertAsync(new Group(
                    groupId,
                    $"Test_{groupId:N}",
                    ImmutableHashSet.Create<Requirement>(new ClaimRequirement("role", role)),
                    ImmutableHashSet.Create(new RoleScope(@namespace, new[] { roleId }))),
                CancellationToken.None);

            await roleStore.UpsertAsync(new Role(
                    roleId,
                    $"Test_{roleId:N}",
                    new[] { new Permission(scope, permissions) }
                ),
                CancellationToken.None);
        });

        return builder;
    }

    public static TestExecutorBuilder AddUser(
        this TestExecutorBuilder builder,
        string sub,
        string name,
        string email,
        string? role = null)
    {
        builder.AddClaim(JwtClaimTypes.Subject, sub);
        builder.AddClaim(JwtClaimTypes.Name, name);
        builder.AddClaim(JwtClaimTypes.Email, email);
        if (role is not null)
        {
            builder.AddClaim(JwtClaimTypes.Role, role);
        }

        return builder;
    }
}
