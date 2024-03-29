using Confix.Authoring.GraphQL.Publishing;
using Confix.Authoring.Publishing;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class PublishingRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddPublishing(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<
            IPublishedApplicationPartsByPartIdDataloader,
            PublishedApplicationPartsByPartByIdPartDataloader>();
        builder
            .AddDataLoader<
                IPublishedApplicationPartByIdDataloader,
                PublishedApplicationPartByByIdDataloader>();

        builder.Services
            .AddScoped<IDataLoader<Guid, PublishedApplicationPart?>>(
                sp => sp.GetRequiredService<IPublishedApplicationPartByIdDataloader>());

        // nodes
        builder.AddType<PublishedApplicationPartNode>();

        // types
        builder.AddTypeExtension<PublishingMutations>();
        builder.AddTypeExtension<PublishingQueries>();

        // extensions
        builder.AddTypeExtension<ApplicationPartPublishingExtensions>();
        builder.AddTypeExtension<ClaimedVersionExtensions>();
        builder.AddTypeExtension<ClaimResultExtensions>();
        builder.AddTypeExtension<PublishedApplicationPartExtensions>();

        // change log

        return builder;
    }
}
