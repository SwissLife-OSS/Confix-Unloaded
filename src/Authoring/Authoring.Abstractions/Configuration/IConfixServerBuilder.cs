using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring
{
    public interface IConfixServerBuilder
    {
        IConfiguration Configuration { get; }
        IServiceCollection Services { get; }
    }
}
