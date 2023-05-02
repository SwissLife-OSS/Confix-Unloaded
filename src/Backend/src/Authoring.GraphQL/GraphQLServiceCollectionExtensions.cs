using System.Diagnostics;
using HotChocolate.Diagnostics;
using HotChocolate.Execution;
using HotChocolate.Execution.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using AuthorizeAttribute = HotChocolate.Authorization.AuthorizeAttribute;
using RequestDelegate = HotChocolate.Execution.RequestDelegate;

namespace Confix.Authoring.GraphQL;

public static class GraphQlServiceCollectionExtensions
{
    public static IServiceCollection AddAuthoringGraphQl(this IServiceCollection services)
    {
        services.AddSingleton<ActivityEnricher, GraphQLActivityEnricher>();
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
            .AddInstrumentation(o =>
            {
                o.RenameRootActivity = true;
                o.Scopes = ActivityScopes.Default;
            })
            .AddDiagnosticEventListener<ErrorLoggingDiagnosticEventListener>()
            .ConfigureSchemaServices(x
                => x.AddSingleton<IReadStoredQueries, RelayResourceManifestQueryStorage>())
            .ModifyOptions(x =>
            {
                x.EnableFlagEnums = true;
                x.EnableOneOf = true;
                x.EnableDefer = true;
            })
            .ModifyRequestOptions(o => o.OnlyAllowPersistedQueries = !Debugger.IsAttached)
            .UsePersistedQueryPipeline();

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
