using Confix.Authoring.GraphQL.Applications;
using Confix.Authoring.Store;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class ChangeLogRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddChangeLog(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<ChangeLogByIdDataloader>();


        // nodes
        builder.AddTypeExtension<ChangeLogNode>();

        // types
        builder.AddTypeExtension<ChangeLogQueries>();

        // extensions
        builder
            .AddTypeExtension<ComponentExtensions>();

        // change log
        builder.AddInterfaceType<IChange>(x => x.Name("Change"));

        return builder;
    }
}
