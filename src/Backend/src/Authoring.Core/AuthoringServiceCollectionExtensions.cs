using Confix.Authentication.Authorization;
using Confix.Authoring.Applications;
using Confix.Authoring.ChangeLogs;
using Confix.Authoring.Components;
using Confix.Authoring.Environement;
using Confix.Authoring.Internal;
using Confix.Authoring.Publishing;
using Confix.Vault.Client;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class AuthoringServiceCollectionExtensions
{
    public static IServiceCollection AddAuthoringCore(this IServiceCollection services)
    {
        services.AddApplications();
        services.AddChangeLog();
        services.AddComponents();
        services.AddRoles();
        services.AddGroups();
        services.AddEnvironments();
        services.AddVariables();
        services.AddSchemas();
        services.AddPublishing();
        services.AddVaultClient();
        return services;
    }
}
