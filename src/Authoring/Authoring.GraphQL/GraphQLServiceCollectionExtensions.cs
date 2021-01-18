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
                .AddQueryType(d => d.Name("Query"))
                .AddType<ApplicationQueries>()
                .AddType<ComponentQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                .AddType<ApplicationMutations>()
                .AddType<ComponentMutations>()
                .RenameRequestToInput<AddApplicationRequest>()
                .RenameRequestToInput<UpdateApplicationPartRequest>()
                .RenameRequestToInput<AddComponentRequest>()
                .AddAuthorization();

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
