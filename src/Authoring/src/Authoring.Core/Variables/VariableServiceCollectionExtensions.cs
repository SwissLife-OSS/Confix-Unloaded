using Confix.Authentication.Authorization;
using Confix.Authoring.Variables;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public static class VariableServiceCollectionExtensions
{
    public static IServiceCollection AddVariables(this IServiceCollection services)
    {
        services.AddAuthorizationRule<Variable, VariableAuthorizationRule>();
        services.AddAuthorizationRule<VariableValue, VariableValueAuthorizationRule>();
        services.AddScoped<IVariableService, VariableService>();
        return services;
    }
}
