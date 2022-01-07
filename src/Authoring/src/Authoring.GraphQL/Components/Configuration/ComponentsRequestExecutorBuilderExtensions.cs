using System;
using Confix.Authoring.Changes;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.GraphQL.Components;
using Confix.Authoring.Store;
using GreenDonut;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class ComponentsRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddComponents(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder
            .AddDataLoader<IComponentDataLoader, ComponentByIdDataLoader>()
            .AddDataLoader<ComponentByIdDataLoader>()
            .AddDataLoader<ChangeLogByComponentIdDataloader>();

        builder.Services
            .AddScoped<IDataLoader<Guid, Component?>>(
                sp => sp.GetRequiredService<ComponentByIdDataLoader>());

        // nodes
        builder.AddTypeExtension<ComponentNode>();

        // types
        builder
            .AddTypeExtension<ComponentQueries>()
            .AddTypeExtension<ComponentMutations>();

        // extensions
        builder
            .AddTypeExtension<ComponentExtensions>();

        // change log
        builder.AddInterfaceType<IComponentChange>(x => x.Name("ComponentChange"))
            .AddType<CreateComponentChange>()
            .AddType<RemoveComponentChange>()
            .AddType<RenameComponentChange>()
            .AddType<ComponentSchemaChange>()
            .AddType<ComponentValuesChange>();

        return builder;
    }
}
