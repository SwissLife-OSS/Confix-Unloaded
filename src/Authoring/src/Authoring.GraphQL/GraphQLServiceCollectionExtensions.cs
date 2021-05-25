using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.GraphQL.Components;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.GraphQL.Serialization;
using HotChocolate.Execution.Configuration;
using HotChocolate.Types;
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
                .AddFiltering()
                .AddSorting()
                .TryAddTypeInterceptor<MutationErrorTypeInterceptor>();

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
                .AddDataLoaders()
                .AddAuthorization()
                .AddErrorTypes();

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

        private static IRequestExecutorBuilder AddQueries(this IRequestExecutorBuilder builder)
        {
            builder
                .AddQueryType()
                .AddTypeExtension<ApplicationQueries>()
                .AddTypeExtension<VariableQueries>()
                .AddTypeExtension<ComponentQueries>();

            return builder;
        }

        private static IRequestExecutorBuilder AddMutations(this IRequestExecutorBuilder builder)
        {
            builder
                .AddMutationType()
                .AddTypeExtension<ApplicationMutations>()
                .AddTypeExtension<VariableMutations>()
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
                .AddTypeExtension<ComponentNode>()
                .AddType<SdlType>();

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
    }

    public class SdlType : StringType
    {
        public SdlType() : base("SDL", bind: BindingBehavior.Explicit)
        {

        }
    }
}
