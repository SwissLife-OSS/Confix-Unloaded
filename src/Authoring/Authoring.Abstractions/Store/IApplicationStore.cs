using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    public interface IApplicationStore
    {
        Task<Application> AddAsync(Application application, CancellationToken cancellationToken);
        Task<IEnumerable<Application>> GetAllAsync(CancellationToken cancellationToken);
        Task<Application> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Application> UpdateAsync(Application application, CancellationToken cancellationToken);
    }
}
