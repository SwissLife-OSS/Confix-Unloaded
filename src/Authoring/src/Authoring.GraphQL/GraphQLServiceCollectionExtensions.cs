using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.GraphQL.Serialization;
using Confix.Authoring.GraphQL.Types;
using Confix.Authoring.Store;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL
{
    public static class GraphQLServiceCollectionExtensions
    {
        public static IConfixServerBuilder AddGraphQLServer(
            this IConfixServerBuilder builder)
        {
            builder
                .Services
                .AddGraphQLServer()
                .AddGraphQLTypes()
                .TryAddTypeInterceptor<MutationErrorTypeInterceptor>()
                .OnSchemaError((ctx, ex) =>
                {

                });

            builder
                .Services
                .AddHttpResultSerializer<ForbiddenHttpResultSerializer>();

            return builder;
        }

        public static IRequestExecutorBuilder AddGraphQLTypes(
            this IRequestExecutorBuilder builder)
        {
            builder
                .EnableRelaySupport()
                .AddQueries()
                .AddMutations()
                .AddTypes()
                .RenameRequests()
                .AddDataLoaders()
                .AddAuthorization()
                .AddErrorTypes()
                .RegisterTypes();

            return builder;
        }

        private static IRequestExecutorBuilder AddErrorTypes(
            this IRequestExecutorBuilder builder)
        {
            return builder
                .AddInterfaceType<IUserError>()
                .AddObjectType<ApplicationIdInvalid>()
                .AddObjectType<ApplicationPartIdInvalid>()
                .AddObjectType<ApplicationNameTaken>();
        }

        private static IRequestExecutorBuilder RegisterTypes(
            this IRequestExecutorBuilder builder)
        {
            return builder
                .AddType<ApplicationType>()
                .AddType<ApplicationPartType>()
                .AddType<ApplicationPartComponentType>()
                .AddType<ComponentType>();
        }

        private static IRequestExecutorBuilder AddQueries(this IRequestExecutorBuilder builder)
        {
            builder
                .AddQueryType(d => d.Name(RootTypes.Query))
                .AddType<ApplicationQueries>()
                .AddType<VariableQueries>()
                .AddType<ComponentQueries>();

            return builder;
        }

        private static IRequestExecutorBuilder AddMutations(this IRequestExecutorBuilder builder)
        {
            builder
                .AddMutationType(d => d.Name(RootTypes.Mutation))
                .AddType<ApplicationMutations>()
                .AddType<VariableMutations>()
                .AddType<ComponentMutations>();

            return builder;
        }

        private static IRequestExecutorBuilder AddTypes(this IRequestExecutorBuilder builder)
        {
            builder
                .AddType<VariableType>()
                .AddType<VariableValueType>();


            return builder;
        }

        private static IRequestExecutorBuilder AddDataLoaders(this IRequestExecutorBuilder builder)
        {
            builder
                .AddDataLoader<ApplicationByIdDataLoader>()
                .AddDataLoader<ApplicationPartByIdDataLoader>()
                .AddDataLoader<VariableByIdDataLoader>()
                .AddDataLoader<ComponentByIdDataLoader>();

            return builder;
        }

        private static IRequestExecutorBuilder RenameRequests(this IRequestExecutorBuilder builder)
        {
            builder
              .RenameRequestToInput<CreateApplicationInput>()
              .RenameRequestToInput<UpdateApplicationPartRequest>()
              .RenameRequestToInput<UpdateComponentSchemaRequest>()
              .RenameRequestToInput<AddVariableRequest>()
              .RenameRequestToInput<SaveVariableValueRequest>()
              .RenameRequestToInput<AddComponentRequest>();

            return builder;
        }

        private static IRequestExecutorBuilder RenameRequestToInput<T>(
            this IRequestExecutorBuilder builder)
        {
            var name = typeof(T).Name.Replace("Request", "Input");
            builder.AddInputObjectType<T>(d => d.Name(name));

            return builder;
        }
    }
}
