using Confix.Authoring.GraphQL.Viewer;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class ViewerRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddViewer(this IRequestExecutorBuilder builder)
    {
        // types
        builder.AddTypeExtension<ViewerQueries>();

        return builder;
    }
}
