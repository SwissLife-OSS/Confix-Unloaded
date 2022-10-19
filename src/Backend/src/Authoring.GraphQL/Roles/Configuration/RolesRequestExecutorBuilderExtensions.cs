using Confix.Authentication.Authorization;
using Confix.Authoring.Roles;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class RolesRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddRoles(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<RoleByIdDataLoader>();

        builder.Services.AddScoped<IDataLoader<Guid, Role?>>(
            sp => sp.GetRequiredService<RoleByIdDataLoader>());

        // types
        builder
            .AddTypeExtension<RoleQueries>()
            .AddTypeExtension<RoleMutations>();

        return builder;
    }
}

