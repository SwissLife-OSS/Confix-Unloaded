using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationStore _appStore;
        private readonly IComponentStore _compStore;
        private readonly ISchemaService _schemaService;
        private readonly IDataLoader<Guid, Component> _componentById;
        private readonly ApplicationPartComponentByIdDataloader
            _applicationPartByIdDataloaderDataLoader;
        private readonly ApplicationPartByIdDataLoader _applicationPartByIdDataLoader;

        public ApplicationService(
            IApplicationStore appStore,
            ApplicationPartByIdDataLoader applicationPartByIdDataLoader,
            ApplicationPartComponentByIdDataloader applicationPartComponentByIdDataloader,
            IComponentStore compStore,
            IDataLoader<Guid, Component> componentById,
            ISchemaService schemaService)
        {
            _appStore = appStore;
            _applicationPartByIdDataLoader = applicationPartByIdDataLoader;
            _applicationPartByIdDataloaderDataLoader = applicationPartComponentByIdDataloader;
            _compStore = compStore;
            _schemaService = schemaService;
            _componentById = componentById;
        }

        public Task<Application?> GetByIdAsync(
            Guid applicationId,
            CancellationToken cancellationToken = default) =>
            _appStore.GetByIdAsync(applicationId, cancellationToken);

        public Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default) =>
            _appStore.GetByPartIdAsync(partId, cancellationToken);

        public Task<ApplicationPart?> GetApplicationPartByIdAsync(
            Guid partId,
            CancellationToken cancellationToken = default) =>
            _applicationPartByIdDataLoader.LoadAsync(partId, cancellationToken);

        public Task<ApplicationPartComponent?> GetApplicationPartComponentByIdAsync(
            Guid componentPartId,
            CancellationToken cancellationToken = default) =>
            _applicationPartByIdDataloaderDataLoader
                .LoadAsync(componentPartId, cancellationToken);

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
                Id = Guid.NewGuid(), Name = name, Namespace = @namespace,
            };

            if (parts is not null)
            {
                application.Parts = parts.Select(
                        n => new ApplicationPart { Id = Guid.NewGuid(), Name = n })
                    .ToList();
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

        public async Task<Application> AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default)
        {
            Application? app =
                await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);
            ApplicationPart? part = app?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

            if (app is null || part is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            IReadOnlyCollection<Component> components =
                await _compStore.GetManyByIdAsync(componentIds, cancellationToken);

            foreach (Component component in components)
            {
                if (part.Components.All(t => t.ComponentId != component.Id))
                {
                    part.Components.Add(new ApplicationPartComponent
                    {
                        Id = Guid.NewGuid(),
                        ComponentId = component.Id,
                        Values = component.Values
                    });
                }
            }

            await _appStore.ReplaceAsync(app, cancellationToken);

            return app;
        }

        public async Task<Application> AddPartToApplicationAsync(
            Guid applicationId,
            string partName,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByIdAsync(applicationId, cancellationToken);

            if (application is null)
            {
                throw new ApplicationNotFoundException(applicationId);
            }

            if (application.Parts.Any(x => x.Name == partName))
            {
                throw new NameTakenException(partName);
            }

            application =
                await _appStore.AddPartToApplicationAsync(applicationId,
                    partName,
                    cancellationToken);

            if (application is null)
            {
                throw new ApplicationNotFoundException(applicationId);
            }

            return application;
        }

        public async Task<Application> RemovePartAsync(
            Guid applicationPartId,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.RemovePartAsync(applicationPartId, cancellationToken);

            if (application is null)
            {
                throw new ApplicationPartNotFoundException(applicationPartId);
            }

            return application;
        }

        public async Task<ApplicationPart> RemoveComponentFromApplicationPartAsync(
            Guid partComponentId,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByComponentPartIdAsync(partComponentId, cancellationToken);

            if (application is null)
            {
                throw new ApplicationPartComponentNotFoundException(partComponentId);
            }

            ApplicationPart? applicationPart =
                application.Parts.FirstOrDefault(x => x.Components.Any(y => y.Id==partComponentId));

            if (applicationPart is null)
            {
                throw new ApplicationPartComponentNotFoundException(partComponentId);
            }

            ApplicationPartComponent? applicationPartComponent =
                applicationPart.Components.FirstOrDefault(x => x.Id == partComponentId);

            if (applicationPartComponent is null)
            {
                return applicationPart;
            }

            applicationPart.Components.Remove(applicationPartComponent);
            await _appStore.ReplaceAsync(application, cancellationToken);

            if (applicationPart is null)
            {
                throw new ApplicationPartComponentNotFoundException(partComponentId);
            }

            return applicationPart;
        }

        public async Task<ApplicationPartComponent> SetApplicationPartComponentValues(
            Guid partComponentId,
            IDictionary<string, object?> values,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByComponentPartIdAsync(partComponentId, cancellationToken);

            ApplicationPartComponent? applicationPartComponent = application
                ?.Parts
                .SelectMany(x => x.Components)
                .FirstOrDefault(x => x.ComponentId == partComponentId);

            if (application is null || applicationPartComponent is null)
            {
                throw new ApplicationPartComponentNotFoundException(partComponentId);
            }

            Component? component = await _componentById
                .LoadAsync(applicationPartComponent.ComponentId, cancellationToken);

            if (component is null)
            {
                throw new ComponentNotFoundException(applicationPartComponent.ComponentId);
            }

            if (component.Schema is null)
            {
                // TODO proper exception
                throw new InvalidOperationException("There is no schema.");
            }

            applicationPartComponent.Values =
                _schemaService.CreateValuesForSchema(component.Schema, values);

            await _appStore.ReplaceAsync(application, cancellationToken);

            return applicationPartComponent;
        }
    }
}
