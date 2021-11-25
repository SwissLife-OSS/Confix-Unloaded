using System;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.GraphQL.Components;
using Confix.Authoring.GraphQL.Serialization;
using GreenDonut;
using HotChocolate.Execution.Configuration;
using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL
{
    public static class GraphQLServiceCollectionExtensions
    {
        public static IConfixServerBuilder AddGraphQLServer(this IConfixServerBuilder builder)
        {
            builder
                .Services
                .AddGraphQLServer()
                .AddGraphQLTypes()
                .TryAddTypeInterceptor<MutationErrorTypeInterceptor>();

            builder
                .Services
                .AddHttpResultSerializer<ForbiddenHttpResultSerializer>();

            return builder;
        }

        public static IRequestExecutorBuilder AddGraphQLTypes(this IRequestExecutorBuilder builder)
        {
            builder
                // types
                .AddQueries()
                .AddMutations()
                .AddTypes()

                // dataloader
                .AddDataLoaders()

                // server options
                .AddAuthorization()
                .AddGlobalObjectIdentification()
                .AddQueryFieldToMutationPayloads()
                .AddFiltering()
                .AddSorting();

            return builder;
        }

        private static IRequestExecutorBuilder AddQueries(this IRequestExecutorBuilder builder)
        {
            builder
                .AddQueryType()
                .AddTypeExtension<ApplicationQueries>()
                .AddTypeExtension<VariableQueries>()
                .AddTypeExtension<EnvironmentQueries>()
                .AddTypeExtension<ComponentQueries>();

            return builder;
        }

        private static IRequestExecutorBuilder AddMutations(this IRequestExecutorBuilder builder)
        {
            builder
                .AddMutationType()
                .AddTypeExtension<ApplicationMutations>()
                .AddTypeExtension<VariableMutations>()
                .AddTypeExtension<EnvironmentMutations>()
                .AddTypeExtension<ComponentMutations>();

            return builder;
        }

        private static IRequestExecutorBuilder AddTypes(this IRequestExecutorBuilder builder)
        {
            builder
                .AddType<VariableType>()
                .AddType<VariableValueType>()
                .AddTypeExtension<ApplicationNode>()
                .AddTypeExtension<ApplicationPartNode>()
                .AddTypeExtension<ApplicationPartComponentNode>()
                .AddTypeExtension<ApplicationApplicationPartExtensions>()
                .AddTypeExtension<ApplicationPartComponentExtensions>()
                .AddTypeExtension<ComponentNode>()
                .AddType<SdlType>();

            builder
                .AddInterfaceType<IUserError>()
                .AddObjectType<ApplicationIdInvalid>()
                .AddObjectType<ApplicationPartIdInvalid>()
                .AddObjectType<ApplicationNameTaken>()
                .AddType<SchemaViolationType>();

            return builder;
        }

        private static IRequestExecutorBuilder AddDataLoaders(this IRequestExecutorBuilder builder)
        {
            builder
                .AddDataLoader<ApplicationByIdDataLoader>()
                .AddDataLoader<ApplicationPartByIdDataLoader>()
                .AddDataLoader<VariableByIdDataLoader>()
                .AddDataLoader<ComponentByIdDataLoader>()
                .AddDataLoader<ApplicationPartComponentByIdDataloader>()
                .AddDataLoader<EnvironmentByIdDataLoader>()
                // add additional dataloader lookups
                .Services
                .AddScoped<IDataLoader<Guid, Component?>>(
                    sp => sp.GetRequiredService<ComponentByIdDataLoader>())
                .AddScoped<IDataLoader<Guid, Environment?>>(
                    sp => sp.GetRequiredService<EnvironmentByIdDataLoader>());

            return builder;
        }
    }

    public class SdlType : StringType
    {
        public SdlType() : base("SDL", bind: BindingBehavior.Explicit)
        {
        }
    }
}
