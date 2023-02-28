using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class GraphQlServiceCollectionExtensions
{
    public static IServiceCollection AddAuthoringGraphQl(this IServiceCollection services)
    {
        services.AddGraphQLServer().AddConfixSchema();

        return services;
    }

    public static IRequestExecutorBuilder AddConfixSchema(this IRequestExecutorBuilder builder)
    {
        builder
            // types
            .AddSharedTypes()
            .AddApiKeys()
            .AddApplications()
            .AddComponents()
            .AddEnvironments()
            .AddVariables()
            .AddPublishing()
            .AddChangeLog()
            .AddRoles()
            .AddGroups()
            .AddViewer()
            // server options
            .AddAuthorization()
            .AddGlobalObjectIdentification()
            .AddQueryFieldToMutationPayloads()
            .AddMutationConventions()
            .AddErrorInterfaceType<IUserError>()
            .AddFiltering()
            .AddSorting()
            .AddInstrumentation()
            .ModifyOptions(x =>
            {
                x.EnableFlagEnums = true;
                x.EnableOneOf = true;
                x.EnableDefer = true;
            });

        return builder;
    }

    private static IRequestExecutorBuilder AddSharedTypes(this IRequestExecutorBuilder builder)
    {
        builder.AddQueryType();
        builder.AddMutationType();
        builder.AddType<SdlType>();
        builder.AddInterfaceType<IUserError>();

        return builder;
    }
}
