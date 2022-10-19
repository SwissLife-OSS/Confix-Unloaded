using Confix.Authoring.DataLoaders;
using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.Store;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class ApplicationRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddApplications(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder
            .AddDataLoader<IApplicationDataLoader, ApplicationByIdDataLoader>()
            .AddDataLoader<IApplicationPartDataLoader, ApplicationPartByIdDataLoader>()
            .AddDataLoader<IApplicationByPartIdDataLoader, ApplicationByPartIdDataLoader>()
            .AddDataLoader<IApplicationByComponentIdDataLoader,
                ApplicationByComponentIdDataLoader>()
            .AddDataLoader<IApplicationPartComponentDataLoader,
                ApplicationPartComponentByIdDataloader>()
            .AddDataLoader<ChangeLogByApplicationIdDataloader>()
            .AddDataLoader<ChangeLogByApplicationPartIdDataloader>()
            .AddDataLoader<ChangeLogByApplicationPartComponentIdDataloader>();

        // nodes
        builder
            .AddTypeExtension<ApplicationPartNode>()
            .AddTypeExtension<ApplicationPartComponentNode>()
            .AddTypeExtension<ApplicationNode>();

        // types
        builder
            .AddTypeExtension<ApplicationQueries>()
            .AddTypeExtension<ApplicationMutations>();

        // extensions
        builder
            .AddTypeExtension<ApplicationApplicationPartExtensions>()
            .AddTypeExtension<ApplicationPartComponentExtensions>()
            .AddTypeExtension<ApplicationPartExtensions>()
            .AddTypeExtension<ApplicationExtensions>()
            .AddTypeExtension<ApplicationPartComponentChangeLogExtensions>();

        // change log
        builder
            .AddType<CreateApplicationChange>()
            .AddType<RenameApplicationChange>()
            .AddType<RenameApplicationPartChange>()
            .AddType<AddComponentToApplicationPartChange>()
            .AddType<AddPartToApplicationChange>()
            .AddType<PublishedApplicationPartChange>()
            .AddType<RemovePartFromApplicationChange>()
            .AddType<RemoveComponentFromApplicationPartChange>()
            .AddType<ApplicationPartComponentValuesChange>();


        builder.AddInterfaceType<IApplicationPartChange>(
            x => x.Name("ApplicationPartChange"));
        builder.AddInterfaceType<IApplicationChange>(
            x => x.Name("ApplicationChange"));
        builder.AddInterfaceType<IApplicationPartComponentChange>(
            x => x.Name("ApplicationPartComponentChange"));

        // error types

        builder
            .AddType<SchemaViolationType>();

        return builder;
    }
}
