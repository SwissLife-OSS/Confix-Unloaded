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
        private readonly IApplicationStore _appStore;
        private readonly IComponentStore _compStore;

        public ApplicationService(
            IApplicationStore appStore,
            IComponentStore compStore)
        {
            _appStore = appStore;
            _compStore = compStore;
        }

        public Task<Application?> GetByIdAsync(
            Guid applicationId,
            CancellationToken cancellationToken = default) =>
            _appStore.GetByIdAsync(applicationId, cancellationToken);

        public Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default) =>
            _appStore.GetByPartIdAsync(partId, cancellationToken);

        public Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
            IEnumerable<Guid> applicationIds,
            CancellationToken cancellationToken = default) =>
            _appStore.GetManyByIdAsync(applicationIds, cancellationToken);

        public Task<ApplicationPart?> GetPartByIdAsync(
            Guid id,
            CancellationToken cancellationToken = default) =>
            _appStore.GetPartByIdAsync(id, cancellationToken);

        public Task<IReadOnlyCollection<ApplicationPart>> GetManyPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken = default) =>
            _appStore.GetManyPartsByIdAsync(ids, cancellationToken);

        public IQueryable<Application> Query() =>
            _appStore.Query();

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

            await _appStore.AddAsync(application, cancellationToken);

            return application;
        }

        public Task RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken = default) =>
            _appStore.RenameAsync(applicationId, name, cancellationToken);

        public Task RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken = default) =>
            _appStore.RenamePartAsync(applicationPartId, name, cancellationToken);

        public async Task AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default)
        {
            Application? app = await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);
            ApplicationPart? part = app?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

            if (part is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            IReadOnlyCollection<Component> components =
                await _compStore.GetManyByIdAsync(componentIds, cancellationToken);

            foreach (Component component in components)
            {
                if (part.Components.Any(t => t.ComponentId == component.Id))
                {
                    part.Components.Add(new ApplicationPartComponent 
                    { 
                        ComponentId = component.Id, 
                        Values = component.Values
                    });
                }
            }
        }
    }
}
