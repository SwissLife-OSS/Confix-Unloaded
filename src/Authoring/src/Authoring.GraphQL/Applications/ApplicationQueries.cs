using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.Applications.Filters;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ApplicationQueries
    {
        /// <summary>
        /// Get all application configurations.
        /// </summary>
        [UsePaging]
        [UseFiltering(typeof(ApplicationFilterInputType))]
        public IQueryable<Application> GetApplications(
            [Service]IApplicationService applicationService) =>
            applicationService.Query();

        /// <summary>
        /// Get a specific application configuration by its ID.
        /// </summary>
        /// <param name="id">The application ID.</param>
        /// <param name="applicationById">The application DataLoader.</param>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns></returns>
        public Task<Application?> GetApplicationByIdAsync(
            [Service]IApplicationService applicationService,
            [ID(nameof(Application))] Guid id,
            CancellationToken cancellationToken) =>
            applicationService.GetByIdAsync(id, cancellationToken);

        public Task<ApplicationPart?> GetApplicationPartByIdAsync(
            [Service]IApplicationService applicationService,
            [ID(nameof(ApplicationPart))] Guid id,
            CancellationToken cancellationToken) =>
            applicationService.GetApplicationPartByIdAsync(id, cancellationToken);

        public Task<ApplicationPartComponent?> GetApplicationPartComponentByIdAsync(
            [Service]IApplicationService applicationService,
            [ID(nameof(ApplicationPartComponent))] Guid partComponentId,
            CancellationToken cancellationToken) =>
            applicationService.GetApplicationPartComponentByIdAsync(partComponentId, cancellationToken);
    }
}
