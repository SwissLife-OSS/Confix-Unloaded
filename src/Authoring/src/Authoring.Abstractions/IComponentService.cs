using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public interface IComponentService
    {
        Task<Component> CreateAsync(
            string name,
            string schema,
            CancellationToken cancellationToken);

        Task<IEnumerable<Component>> GetAllAsync(
            CancellationToken cancellationToken);

        Task<IEnumerable<Component>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        Task<Component> UpdateSchemaAsync(
            Guid id,
            string schema,
            CancellationToken cancellationToken);
    }
}
