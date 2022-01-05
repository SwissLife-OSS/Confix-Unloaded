using System;
using Confix.Authoring.Changes;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.GraphQL.Components;
using Confix.Authoring.GraphQL.Serialization;
using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;
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
                .AddTypeExtension<ChangeLogQueries>()
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
                .AddTypeExtension<VariableValueExtensions>()
                .AddTypeExtension<VariableExtensions>()
                .AddTypeExtension<ComponentExtensions>()
                .AddTypeExtension<ApplicationPartComponentNode>()
                .AddTypeExtension<ApplicationApplicationPartExtensions>()
                .AddTypeExtension<ApplicationPartComponentExtensions>()
                .AddTypeExtension<ComponentNode>()
                .AddTypeExtension<ApplicationPartExtensions>()
                .AddTypeExtension<ApplicationExtensions>()
                .AddTypeExtension<ApplicationPartComponentChangeLogExtensions>()
                .AddTypeExtension<QueryVariablesExtensions>()
                .AddTypeExtension<ApplicationPartNode>()
                .AddTypeExtension<ApplicationNode>()
                .AddTypeExtension<ChangeLogNode>()
                .AddType<SdlType>();

            builder
                .AddInterfaceType<IUserError>()
                .AddObjectType<ApplicationIdInvalid>()
                .AddObjectType<ApplicationPartIdInvalid>()
                .AddObjectType<ApplicationNameTaken>()
                .AddType<SchemaViolationType>();

            builder.AddInterfaceType<IChange>(x => x.Name("Change"));
            builder.AddInterfaceType<IApplicationPartChange>(x => x.Name("ApplicationPartChange"));
            builder.AddInterfaceType<IApplicationChange>(x => x.Name("ApplicationChange"));
            builder.AddInterfaceType<IApplicationPartComponentChange>(x =>
                x.Name("ApplicationPartComponentChange"));
            builder.AddType<CreateApplicationChange>();
            builder.AddType<RenameApplicationChange>();
            builder.AddType<RenameApplicationPartChange>();
            builder.AddType<AddComponentToApplicationPartChange>();
            builder.AddType<AddPartToApplicationChange>();
            builder.AddType<RemovePartFromApplicationChange>();
            builder.AddType<RemoveComponentFromApplicationPartChange>();
            builder.AddType<ApplicationPartComponentValuesChange>();
            builder.AddType<CreateComponentChange>();

            builder.AddInterfaceType<IComponentChange>(x => x.Name("ComponentChange"));
            builder.AddType<CreateComponentChange>();
            builder.AddType<RemoveComponentChange>();
            builder.AddType<RenameComponentChange>();
            builder.AddType<ComponentSchemaChange>();
            builder.AddType<ComponentValuesChange>();

            builder.AddInterfaceType<IVariableChange>(x => x.Name("VariableChange"));
            builder.AddType<CreateVariableChange>();
            builder.AddType<RenameVariableChange>();
            builder.AddType<DeleteVariableValueChange>();
            builder.AddType<VariableValueChange>();

            return builder;
        }

        private static IRequestExecutorBuilder AddDataLoaders(this IRequestExecutorBuilder builder)
        {
            builder
                .AddDataLoader<IApplicationDataLoader, ApplicationByIdDataLoader>()
                .AddDataLoader<IApplicationPartDataLoader, ApplicationPartByIdDataLoader>()
                .AddDataLoader<IVariableDataLoader, VariableByIdDataLoader>()
                .AddDataLoader<IComponentDataLoader, ComponentByIdDataLoader>()
                .AddDataLoader<VariableByIdDataLoader>()
                .AddDataLoader<ComponentByIdDataLoader>()
                .AddDataLoader<IApplicationPartComponentDataLoader,
                    ApplicationPartComponentByIdDataloader>()
                .AddDataLoader<ChangeLogByIdDataloader>()
                .AddDataLoader<ChangeLogByApplicationIdDataloader>()
                .AddDataLoader<ChangeLogByApplicationPartIdDataloader>()
                .AddDataLoader<ChangeLogByApplicationPartComponentIdDataloader>()
                .AddDataLoader<ChangeLogByComponentIdDataloader>()
                .AddDataLoader<ChangeLogByVariableIdDataloader>()
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
