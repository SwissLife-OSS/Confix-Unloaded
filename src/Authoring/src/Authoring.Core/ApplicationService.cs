using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationStore _store;

        public ApplicationService(IApplicationStore store)
        {
            _store = store;
        }

        public Task<Application?> GetByIdAsync(
            Guid applicationId,
            CancellationToken cancellationToken = default) =>
            _store.GetByIdAsync(applicationId, cancellationToken);

        public Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default) =>
            _store.GetByPartIdAsync(partId, cancellationToken);

        public Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
            IEnumerable<Guid> applicationIds,
            CancellationToken cancellationToken = default) =>
            _store.GetManyByIdAsync(applicationIds, cancellationToken);

        public Task<ApplicationPart?> GetPartByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default) =>
            _store.GetPartByIdAsync(id, cancellationToken);

        public Task<IReadOnlyCollection<ApplicationPart>> GetManyPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken = default) =>
            _store.GetManyPartsByIdAsync(ids, cancellationToken);

        public IQueryable<Application> QueryApplications() =>
            _store.QueryApplications();

        public async Task<Application> CreateAsync(
            string name,
            string? @namespace,
            IReadOnlyList<string>? parts = null,
            CancellationToken cancellationToken = default)
        {
            var application = new Application
            {
                Id = Guid.NewGuid(),
                Name = name,
                Namespace = @namespace,
            };

            if (parts is not null)
            {
                application.Parts = parts.Select(
                    n => new ApplicationPart
                    {
                        Id = Guid.NewGuid(),
                        Name = n
                    }).ToList();
            }

            await _store.AddAsync(application, cancellationToken);

            return application;
        }

        public Task RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken = default) =>
            _store.RenameAsync(applicationId, name, cancellationToken);

        public Task RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken = default) =>
            _store.RenamePartAsync(applicationPartId, name, cancellationToken);

        public async Task AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default)
        {
            Application? app = await _store.GetByPartIdAsync(applicationPartId, cancellationToken);
            ApplicationPart? part = app?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

            if (part is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            foreach (Guid componentId in componentIds)
            {
                if (part.Components.Any(t => t.ComponentId == componentId))
                {
                    part.Components.Add(new ApplicationPartComponent { ComponentId = componentId });
                }
            }
        }
    }
}
