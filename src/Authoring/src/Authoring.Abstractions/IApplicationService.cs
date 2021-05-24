using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public interface IApplicationService
    {
        Task<Application?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default);

        Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default);

        Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken = default);

        Task<ApplicationPart?> GetPartByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default);

        Task<IReadOnlyCollection<ApplicationPart>> GetManyPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken = default);

        IQueryable<Application> Query();

        Task<Application> CreateAsync(
            string name,
            string? @namespace,
            IReadOnlyList<string>? parts = null,
            CancellationToken cancellationToken = default);

        Task RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken = default);

        Task RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken = default);

        Task AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default);
    }
}
