using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.GraphQL.Serialization;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL
{
    public static class GrapQLServiceCollectionExtensions
    {
        public static IConfixServerBuilder AddGraphQLServer(
            this IConfixServerBuilder builder)
        {
            builder.Services.AddGraphQLServer()
                .AddGraphQL();

            builder.Services.AddHttpResultSerializer<ForbiddenHttpResultSerializer>();

            return builder;
        }

        private static IRequestExecutorBuilder AddGraphQL(
            this IRequestExecutorBuilder builder)
        {
            builder
                .AddQueries()
                .AddMutations()
                .AddTypes()
                .RenameRequests()
                .AddDataLoaders()
                .AddAuthorization();

            return builder;
        }

        private static IRequestExecutorBuilder AddQueries(this IRequestExecutorBuilder builder)
        {
            builder
                .AddQueryType(d => d.Name("Query"))
                .AddType<ApplicationQueries>()
                .AddType<VariableQueries>()
                .AddType<ComponentQueries>();

            return builder;
        }

        private static IRequestExecutorBuilder AddMutations(this IRequestExecutorBuilder builder)
        {
            builder
                .AddMutationType(d => d.Name("Mutation"))
                .AddType<ApplicationMutations>()
                .AddType<VariableMutations>()
                .AddType<ComponentMutations>();

            return builder;
        }

        private static IRequestExecutorBuilder AddTypes(this IRequestExecutorBuilder builder)
        {
            builder
                .AddType<ApplicationPartComponentType>()
                .AddType<ApplicationPartType>();

            return builder;
        }

        private static IRequestExecutorBuilder AddDataLoaders(this IRequestExecutorBuilder builder)
        {
            builder
                .AddDataLoader<ComponentByIdDataLoader>();

            return builder;
        }

        private static IRequestExecutorBuilder RenameRequests(this IRequestExecutorBuilder builder)
        {
            builder
              .RenameRequestToInput<AddApplicationRequest>()
              .RenameRequestToInput<UpdateApplicationPartRequest>()
              .RenameRequestToInput<UpdateComponentSchemaRequest>()
              .RenameRequestToInput<AddVariableRequest>()
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
