using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;

namespace Confix.Authoring
{
    public interface IComponentService
    {
        Task<Component?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default);

        Task<ISchema?> GetSchemaByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default);

        Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        IQueryable<Component> Query();

        Task<Component> CreateAsync(
            string name,
            string? schema,
            CancellationToken cancellationToken);

        Task<Component> UpdateSchemaAsync(
            Guid id,
            string schema,
            string? values,
            CancellationToken cancellationToken);
    }
}
