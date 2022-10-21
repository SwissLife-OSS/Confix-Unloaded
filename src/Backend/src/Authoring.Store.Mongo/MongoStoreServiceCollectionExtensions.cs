using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing.Stores;
using Confix.Authoring.Store;
using Confix.Authoring.Store.Mongo;
using Confix.Common;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Authoring;

public static class MongoStoreServiceCollectionExtensions
{
    public static IAuthoringServerBuilder UseMongoDbStores(
        this IAuthoringServerBuilder builder,
        string pathToConfig = Settings.Confix.Authoring.Database.Mongo.Section)
    {
        builder.Services
            .AddOptions<MongoOptions>(nameof(AuthoringDbContext))
            .BindConfiguration(pathToConfig);

        builder.Services.AddSingleton<IAuthoringDbContext, AuthoringDbContext>();
        builder.Services.AddSingleton<IApplicationStore, ApplicationStore>();
        builder.Services.AddSingleton<IChangeLogStore, ChangeLogStore>();
        builder.Services.AddSingleton<IEnvironmentStore, EnvironmentStore>();
        builder.Services.AddSingleton<IComponentStore, ComponentStore>();
        builder.Services.AddSingleton<IVariableStore, VariableStore>();
        builder.Services.AddSingleton<IVariableValueStore, VariableValueStore>();
        builder.Services.AddSingleton<IPublishingStore, PublishingStore>();
        builder.Services.AddSingleton<IRoleStore, RoleStore>();
        builder.Services.AddSingleton<IGroupStore, GroupStore>();

        SerializerHelpers.RegisterSerializers();

        return builder;
    }
}
