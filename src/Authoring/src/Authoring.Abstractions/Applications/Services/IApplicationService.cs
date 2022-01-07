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

        Task<ApplicationPart?> GetApplicationPartByIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default);

        Task<ApplicationPartComponent?> GetApplicationPartComponentByIdAsync(
            Guid partComponentId,
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

        Task<Application> RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken = default);

        Task<ApplicationPart> RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken = default);

        Task<ApplicationPart> AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds a part to the application
        /// </summary>
        /// <param name="applicationId">Id of the application</param>
        /// <param name="partName">Name of the part</param>
        /// <param name="cancellationToken">Cancellation Token</param>
        /// <exception cref="ApplicationNotFoundException">
        /// Throw when the <paramref name="applicationId"/> does not find the </exception>
        /// <returns>The modified application</returns>
        Task<Application> AddPartToApplicationAsync(
            Guid applicationId,
            string partName,
            CancellationToken cancellationToken = default);

        Task<Application> RemovePartAsync(
            Guid applicationPartId,
            CancellationToken cancellationToken = default);

        Task<ApplicationPart> RemoveComponentFromApplicationPartAsync(
            Guid partComponentId,
            CancellationToken cancellationToken = default);

        Task<ApplicationPartComponent> SetApplicationPartComponentValues(
            Guid partComponentId,
            IDictionary<string, object?> values,
            CancellationToken cancellationToken = default);
    }
}
