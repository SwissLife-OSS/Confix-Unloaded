using Confix.Authentication.Authorization;
using Confix.Authoring.DataLoaders;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class GroupsRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddGroups(this IRequestExecutorBuilder builder)
    {
        builder.AddDataLoader<GroupByIdDataLoader>();

        builder.Services.AddScoped<IDataLoader<Guid, Group?>>(
            sp => sp.GetRequiredService<GroupByIdDataLoader>());

        // types
        builder
            .AddType<ClaimRequirement>()
            .AddTypeExtension<RoleScopeExtensions>()
            .AddTypeExtension<GroupQueries>()
            .AddTypeExtension<GroupMutations>();

        return builder;
    }
}
