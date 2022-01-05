using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    // <summary>
    /// <summary>
    /// Represents the application store abstraction.
    /// </summary>
    public interface IApplicationStore
    {
        /// <summary>
        /// Gets the application by its <paramref name="id"/>.
        /// </summary>
        /// <param name="id">
        /// The application ID.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <returns>
        /// Returns an <see cref="Application"/> if one is found matching the specified
        /// <paramref name="id"/>; otherwise, null will be returned.
        /// </returns>
        Task<Application?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken);

        /// <summary>
        /// Gets the application the id of one of its application parts.
        /// </summary>
        /// <param name="partId">
        /// The application part ID.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <returns>
        /// Returns an <see cref="Application"/> if one is found matching the specified
        /// <paramref name="partId"/>; otherwise, null will be returned.
        /// </returns>
        Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken);

        /// <summary>
        /// Gets the application part by its <paramref name="id"/>.
        /// </summary>
        /// <param name="id">
        /// The application part ID.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <returns>
        /// Returns an <see cref="ApplicationPart"/> if one is found matching the specified
        /// <paramref name="id"/>; otherwise, null will be returned.
        /// </returns>
        Task<ApplicationPart?> GetPartByIdAsync(
            Guid id,
            CancellationToken cancellationToken);

        /// <summary>
        /// Gets multiple applications by their <paramref name="ids"/>.
        /// </summary>
        /// <param name="ids">
        /// The application ids.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <returns>
        /// Returns a list of applications that matched the <paramref name="ids"/>.
        /// </returns>
        Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        /// <summary>
        /// Gets multiple application parts by their <paramref name="ids"/>.
        /// </summary>
        /// <param name="ids">
        /// The application part ids.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <returns>
        /// Returns a list of application parts that matched the <paramref name="ids"/>.
        /// </returns>
        Task<IReadOnlyCollection<ApplicationPart>> GetManyPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        Task<IReadOnlyCollection<ApplicationPartComponent>> GetManyComponentPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        /// <summary>
        /// Allows to query the application store.
        /// </summary>
        IQueryable<Application> Query();

        /// <summary>
        /// Adds a new application to the application store.
        /// </summary>
        /// <param name="application">
        /// The new application that shall be added.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// <paramref name="application"/> is <c>null</c>.
        /// </exception>
        Task AddAsync(
            Application application,
            CancellationToken cancellationToken);

        /// <summary>
        /// Replaces an application object with the new <paramref name="application"/>.
        /// </summary>
        /// <param name="application">
        /// The updated application that shall replace the one in the store.
        /// </param>
        /// <param name="cancellationToken">
        /// The cancellation token.
        /// </param>
        /// <exception cref="ArgumentNullException">
        /// <paramref name="application"/> is <c>null</c>.
        /// </exception>
        Task ReplaceAsync(
            Application application,
            CancellationToken cancellationToken);

        Task<Application?> GetByComponentPartIdAsync(
            Guid componentPartId,
            CancellationToken cancellationToken);
    }
}
