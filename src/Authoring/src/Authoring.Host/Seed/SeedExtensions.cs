namespace Confix.Authoring;

public static class SeedExtensions
{
    public static IServiceCollection AddSeedWorker(this IServiceCollection services)
    {
        services
            .AddOptions<AdminRequirementOptions>()
            .BindConfiguration("Confix:Authoring:AdminRequirement");

        services.AddHostedService<SeedWorker>();

        return services;
    }
}
