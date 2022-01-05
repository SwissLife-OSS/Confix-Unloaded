using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using GreenDonut;

namespace Confix.Authoring
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationStore _appStore;
        private readonly IChangeLogService _changeLogService;
        private readonly IComponentStore _compStore;
        private readonly ISchemaService _schemaService;
        private readonly IDataLoader<Guid, Component> _componentById;
        private readonly IApplicationPartComponentDataLoader
            _applicationPartByIdDataloaderDataLoader;
        private readonly IApplicationPartDataLoader _applicationPartByIdDataLoader;

        public ApplicationService(
            IApplicationStore appStore,
            IChangeLogService changeLogService,
            IApplicationPartDataLoader applicationPartByIdDataLoader,
            IApplicationPartComponentDataLoader applicationPartComponentByIdDataloader,
            IComponentStore compStore,
            IDataLoader<Guid, Component> componentById,
            ISchemaService schemaService)
        {
            _appStore = appStore;
            _changeLogService = changeLogService;
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
            Application application = new()
            {
                Id = Guid.NewGuid(), Name = name, Namespace = @namespace,
            };

            List<IChange> changeLogs = new();
            List<ApplicationPart> applicationParts = new();

            changeLogs.Add(new CreateApplicationChange()
            {
                ApplicationId = application.Id,
                ApplicationVersion = application.Version,
                Application = application with { Parts = new List<ApplicationPart>() }
            });

            if (parts is not null)
            {
                foreach (var part in parts)
                {
                    application.Version++;
                    ApplicationPart applicationPart = new() { Id = Guid.NewGuid(), Name = part };
                    AddPartToApplicationChange log = new()
                    {
                        ApplicationId = application.Id,
                        ApplicationVersion = application.Version,
                        PartId = application.Id,
                        PartVersion = application.Version,
                        AddedPart = applicationPart
                    };
                    changeLogs.Add(log);
                    applicationParts.Add(applicationPart);
                }
            }

            application.Parts = applicationParts;

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(changeLogs, cancellationToken);
                await _appStore.AddAsync(application, cancellationToken);

                transaction.Complete();
            }

            return application;
        }

        public async Task RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByIdAsync(applicationId, cancellationToken);

            if (application is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationId);
            }

            application.Name = name;

            application.Version++;

            RenameApplicationChange log = new()
            {
                ApplicationId = application.Id,
                ApplicationVersion = application.Version,
                Name = name,
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
            }
        }

        public async Task RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);

            ApplicationPart? applicationPart =
                application?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

            if (application is null || applicationPart is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            applicationPart.Name = name;

            application.Version++;
            applicationPart.Version++;

            RenameApplicationPartChange log = new()
            {
                ApplicationId = application.Id,
                Name = name,
                ApplicationVersion = application.Version,
                PartId = applicationPart.Id,
                PartVersion = applicationPart.Version
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
            }
        }

        public async Task<Application> AddComponentsToPartAsync(
            Guid applicationPartId,
            IReadOnlyList<Guid> componentIds,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);

            ApplicationPart? applicationPart =
                application?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

            if (application is null || applicationPart is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            IReadOnlyCollection<Component> components =
                await _compStore.GetManyByIdAsync(componentIds, cancellationToken);

            List<AddComponentToApplicationPartChange> changeLogs = new();

            foreach (Component component in components)
            {
                if (applicationPart.Components.All(t => t.ComponentId != component.Id))
                {
                    application.Version++;
                    applicationPart.Version++;
                    ApplicationPartComponent applicationPartComponent = new()
                    {
                        Id = Guid.NewGuid(),
                        ComponentId = component.Id,
                        Values = component.Values
                    };
                    AddComponentToApplicationPartChange log = new()
                    {
                        ApplicationId = application.Id,
                        ApplicationVersion = application.Version,
                        PartId = applicationPartId,
                        PartVersion = applicationPart.Version,
                        PartComponentId = applicationPartComponent.Id,
                        PartComponentVersion = applicationPartComponent.Version,
                        AddedComponent = applicationPartComponent,
                    };
                    applicationPart.Components.Add(applicationPartComponent);
                    changeLogs.Add(log);
                }
            }

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(changeLogs, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
            }

            return application;
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

            ApplicationPart newApplicationPart = new() { Id = Guid.NewGuid(), Name = partName };

            application.Parts.Add(newApplicationPart);

            application.Version++;

            AddPartToApplicationChange log = new()
            {
                ApplicationId = application.Id,
                AddedPart = newApplicationPart,
                ApplicationVersion = application.Version
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
            }

            return application;
        }

        public async Task<Application> RemovePartAsync(
            Guid applicationPartId,
            CancellationToken cancellationToken = default)
        {
            Application? application =
                await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);

            ApplicationPart? applicationPart =
                application?.Parts.FirstOrDefault(x => x.Id == applicationPartId);

            if (applicationPart is null || application is null)
            {
                throw new ApplicationPartNotFoundException(applicationPartId);
            }

            application.Version++;
            applicationPart.Version++;

            RemovePartFromApplicationChange log = new()
            {
                ApplicationId = application.Id,
                RemovedPart = applicationPart,
                ApplicationVersion = application.Version,
                PartId = applicationPart.Id,
                PartVersion = applicationPart.Version,
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
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
                application.Parts.FirstOrDefault(
                    x => x.Components.Any(y => y.Id == partComponentId));

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

            application.Version++;
            applicationPart.Version++;
            applicationPartComponent.Version++;

            RemoveComponentFromApplicationPartChange log = new()
            {
                ApplicationId = application.Id,
                ApplicationVersion = application.Version,
                PartId = applicationPart.Id,
                PartVersion = applicationPart.Version,
                PartComponentId = applicationPartComponent.Id,
                PartComponentVersion = applicationPartComponent.Version,
                RemovedComponent = applicationPartComponent,
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
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

            if (application is null)
            {
                throw new ApplicationPartComponentNotFoundException(partComponentId);
            }

            ApplicationPart? applicationPart = null;
            ApplicationPartComponent? applicationPartComponent = null;
            foreach (ApplicationPart part in application.Parts)
            {
                foreach (ApplicationPartComponent partComponent in part.Components)
                {
                    if (partComponent.Id == partComponentId)
                    {
                        applicationPartComponent = partComponent;
                        applicationPart = part;
                    }
                }
            }

            if (applicationPart is null || applicationPartComponent is null)
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

            application.Version++;
            applicationPart.Version++;
            applicationPartComponent.Version++;

            ApplicationPartComponentValuesChange log = new()
            {
                ApplicationId = application.Id,
                PartId = applicationPart.Id,
                PartComponentId = applicationPartComponent.Id,
                Values = applicationPartComponent.Values,
                ApplicationVersion = application.Version,
                PartVersion = applicationPart.Version,
                PartComponentVersion = applicationPartComponent.Version
            };

            using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await _changeLogService.CreateAsync(log, cancellationToken);
                await _appStore.ReplaceAsync(application, cancellationToken);

                transaction.Complete();
            }

            return applicationPartComponent;
        }
    }
}
