using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring;

public interface IAuthoringServerBuilder
{
    IServiceCollection Services { get; }
}
