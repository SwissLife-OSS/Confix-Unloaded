using Confix.Authentication.Authorization;
using Confix.Authoring.Store;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.ChangeLogs;

public static class ChangeLogServiceCollectionExtensions
{
    public static IServiceCollection AddChangeLog(this IServiceCollection services)
    {
        services.AddScoped<IChangeLogService, ChangeLogService>();
        services.AddAuthorizationRule<ChangeLog, ChangeLogAuthorizationRule>();

        return services;
    }
}
