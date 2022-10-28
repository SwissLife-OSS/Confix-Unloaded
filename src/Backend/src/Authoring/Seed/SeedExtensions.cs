using Confix.Common;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class SeedExtensions
{
    public static IServiceCollection AddSeedWorker(
        this IServiceCollection services,
        string pathToConfig = Settings.Confix.Authoring.Seed.AdminRequirement.Section)
    {
        services
            .AddOptions<AdminRequirementOptions>()
            .BindConfiguration(pathToConfig);

        services.AddHostedService<SeedWorker>();

        return services;
    }
}
