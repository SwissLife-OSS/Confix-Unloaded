using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring
{
    public class ConfixServerBuilder : IConfixServerBuilder
    {
        public ConfixServerBuilder(
            IConfiguration configuration,
            IServiceCollection services)
        {
            Configuration = configuration;
            Services = services;
        }

        public IConfiguration Configuration { get; }
        public IServiceCollection Services { get; }
    }
}
