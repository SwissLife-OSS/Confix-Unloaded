using Confix.Authoring.GraphQL.Serialization;
using HotChocolate.Execution.Configuration;
using HotChocolate.Resolvers;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class GraphQLServiceCollectionExtensions
{
    public static IConfixServerBuilder AddGraphQLServer(this IConfixServerBuilder builder)
    {
        builder.Services.AddGraphQLServer().AddConfixSchema();

        return builder;
    }

    public static IRequestExecutorBuilder AddConfixSchema(this IRequestExecutorBuilder builder)
    {
        builder
            // types
            .AddCoreTypes()
            .AddApplications()
            .AddComponents()
            .AddEnvironments()
            .AddVariables()
            .AddPublishing()
            .AddChangeLog()
            // server options
            .AddAuthorization()
            .AddGlobalObjectIdentification()
            .AddQueryFieldToMutationPayloads()
            .AddMutationConventions()
            .AddErrorInterfaceType<IUserError>()
            .AddFiltering()
            .AddSorting();

        builder
            .Services
            .AddHttpResultSerializer<ForbiddenHttpResultSerializer>();

        return builder;
    }

    private static IRequestExecutorBuilder AddCoreTypes(this IRequestExecutorBuilder builder)
    {
        builder.AddQueryType();
        builder.AddMutationType();
        builder.AddType<SdlType>();
        builder.AddInterfaceType<IUserError>();

        return builder;
    }
}
