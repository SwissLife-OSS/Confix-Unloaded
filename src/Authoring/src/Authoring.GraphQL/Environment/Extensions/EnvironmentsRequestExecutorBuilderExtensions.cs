using System;
using Confix.Authoring.DataLoaders;
using GreenDonut;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class EnvironmentsRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddEnvironments(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<EnvironmentByIdDataLoader>();

        builder.Services
            .AddScoped<IDataLoader<Guid, Environment?>>(
                sp => sp.GetRequiredService<EnvironmentByIdDataLoader>());

        // TODO: Node

        // types
        builder
            .AddTypeExtension<EnvironmentQueries>()
            .AddTypeExtension<EnvironmentMutations>();

        // TODO: Change Log

        return builder;
    }
}
