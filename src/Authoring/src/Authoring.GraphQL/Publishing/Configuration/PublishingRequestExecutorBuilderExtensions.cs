using System;
using Confix.Authoring.GraphQL.Publishing;
using Confix.Authoring.Publishing;
using GreenDonut;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class PublishingRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddPublishing(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder.AddDataLoader<
            IPublishedApplicationPartByPartIdDataloader,
            PublishedApplicationPartByIdPartDataloader>();
        builder.AddDataLoader<PublishedApplicationPartByIdDataloader>();

        builder.Services
            .AddScoped<IDataLoader<Guid, PublishedApplicationPart>>(
                sp => sp.GetRequiredService<PublishedApplicationPartByIdDataloader>());

        // nodes
        builder.AddType<PublishedApplicationPartNode>();

        // types
        builder.AddTypeExtension<PublishingMutations>();

        // extensions
        builder.AddTypeExtension<ApplicationPartPublishingExtensions>();
        builder.AddTypeExtension<ClaimedVersionExtensions>();

        // change log

        return builder;
    }
}
