using Confix.Authoring.ApiKeys.DataLoaders;
using Confix.Authoring.GraphQL.ApiKeys;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class ApiKeyRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddApiKeys(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<IApiKeyByIdDataLoader, ApiKeyByIdDataLoader>();

        // nodes

        // types
        builder.AddTypeExtension<ApiKeyQueries>().AddTypeExtension<ApiKeyMutations>();

        return builder;
    }
}
