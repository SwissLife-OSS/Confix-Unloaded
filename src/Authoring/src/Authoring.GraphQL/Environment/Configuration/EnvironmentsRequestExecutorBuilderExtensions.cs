using System;
using Confix.Authoring.DataLoaders;
using GreenDonut;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Confix.Authoring.GraphQL.Relay;

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

        builder.AddTypeExtension<EnvironmentNode>();

        // types
        builder
            .AddTypeExtension<EnvironmentQueries>()
            .AddTypeExtension<EnvironmentMutations>();

        // extensions
        builder.AddTypeExtension<EnvironmentExtensions>();

        return builder;
    }
}
