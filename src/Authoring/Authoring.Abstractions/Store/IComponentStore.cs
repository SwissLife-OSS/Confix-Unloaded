using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    public interface IComponentStore
    {
        Task<Component> AddAsync(Component component, CancellationToken cancellationToken);
        Task<IEnumerable<Component>> GetAllAsync(CancellationToken cancellationToken);
        Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<IEnumerable<Component>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<Component> UpdateAsync(Component component, CancellationToken cancellationToken);
    }
}
