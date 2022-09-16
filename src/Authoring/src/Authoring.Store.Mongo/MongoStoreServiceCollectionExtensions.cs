using Confix.Authentication.Authorization;
using Confix.Authoring.Publishing.Stores;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Extensions.Context;

namespace Confix.Authoring.Store.Mongo;

public static class MongoStoreServiceCollectionExtensions
{
    public static IConfixServerBuilder AddMongoStore(this IConfixServerBuilder builder)
    {
        builder.Services.AddMongoStore(builder.Configuration);

        return builder;
    }

    public static IServiceCollection AddMongoStore(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        MongoOptions options = configuration.GetSection("Confix:Storage:Database")
            .Get<MongoOptions>();

        services.AddSingleton<IConfixAuthorDbContext>(new ConfixAuthorDbContext(options));
        services.AddSingleton<IApplicationStore, ApplicationStore>();
        services.AddSingleton<IChangeLogStore, ChangeLogStore>();
        services.AddSingleton<IEnvironmentStore, EnvironmentStore>();
        services.AddSingleton<IComponentStore, ComponentStore>();
        services.AddSingleton<IVariableStore, VariableStore>();
        services.AddSingleton<IVariableValueStore, VariableValueStore>();
        services.AddSingleton<IPublishingStore, PublishingStore>();
        services.AddSingleton<IRoleStore, RoleStore>();
        services.AddSingleton<IGroupStore, GroupStore>();

        return services;
    }
}
