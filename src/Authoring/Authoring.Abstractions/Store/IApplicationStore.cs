using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    public interface IApplicationStore
    {
        Task<Application> AddAsync(Application application, CancellationToken cancellationToken);
        Task<IEnumerable<Application>> GetAllAsync(CancellationToken cancellationToken);
    }
}
