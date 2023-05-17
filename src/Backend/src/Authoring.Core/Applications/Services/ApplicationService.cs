using System.Text.Json;
using System.Transactions;
using Confix.Authentication.Authorization;
using Confix.Authoring.Extensions;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using Confix.Common.Exceptions;
using GreenDonut;
using static Confix.Authentication.Authorization.Permissions;

namespace Confix.Authoring;

internal sealed class ApplicationService : IApplicationService
{
    private readonly IApplicationPartDataLoader _applicationPartByIdDataLoader;
    private readonly IApplicationPartComponentDataLoader _applicationPartByIdDataloaderDataLoader;
    private readonly IApplicationStore _appStore;
    private readonly IAuthorizationService _authorizationService;
    private readonly IChangeLogService _changeLogService;
    private readonly IComponentDataLoader _componentById;
    private readonly IComponentStore _compStore;
    private readonly ISchemaValidator _schemaValidator;
    private readonly ISessionAccessor _sessionAccessor;

    public ApplicationService(
        IApplicationPartDataLoader applicationPartByIdDataLoader,
        IApplicationPartComponentDataLoader applicationPartByIdDataloaderDataLoader,
        IApplicationStore appStore,
        IAuthorizationService authorizationService,
        IChangeLogService changeLogService,
        IComponentDataLoader componentById,
        IComponentStore compStore,
        ISchemaValidator schemaValidator,
        ISessionAccessor sessionAccessor)
    {
        _applicationPartByIdDataLoader = applicationPartByIdDataLoader;
        _applicationPartByIdDataloaderDataLoader = applicationPartByIdDataloaderDataLoader;
        _appStore = appStore;
        _authorizationService = authorizationService;
        _changeLogService = changeLogService;
        _componentById = componentById;
        _compStore = compStore;
        _schemaValidator = schemaValidator;
        _sessionAccessor = sessionAccessor;
    }

    public async Task<Application?> GetByIdAsync(
        Guid applicationId,
        CancellationToken cancellationToken = default)
        => await _authorizationService
            .RuleFor<Application>()
            .AuthorizeOrNullAsync(
                await _appStore.GetByIdAsync(applicationId, cancellationToken),
                Read,
                cancellationToken);

    public async Task<Application?> GetByPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken = default)
        => await _authorizationService
            .RuleFor<Application>()
            .AuthorizeOrNullAsync(
                await _appStore.GetByPartIdAsync(partId, cancellationToken),
                Read,
                cancellationToken);

    public async Task<ApplicationPart?> GetApplicationPartByIdAsync(
        Guid partId,
        CancellationToken cancellationToken = default) =>
        await _authorizationService
            .RuleFor<ApplicationPart>()
            .AuthorizeOrNullAsync(
                await _applicationPartByIdDataLoader.LoadAsync(partId, cancellationToken),
                Read,
                cancellationToken);

    public async Task<ApplicationPartComponent?> GetApplicationPartComponentByIdAsync(
        Guid componentPartId,
        CancellationToken cancellationToken = default) =>
        await _authorizationService
            .RuleFor<ApplicationPartComponent>()
            .AuthorizeOrNullAsync(
                await _applicationPartByIdDataloaderDataLoader
                    .LoadAsync(componentPartId, cancellationToken),
                Read,
                cancellationToken);

    public async Task<Application?> FindByApplicationNameAsync(
        string applicationName,
        CancellationToken cancellationToken = default)
        => await _authorizationService
            .RuleFor<Application>()
            .AuthorizeOrNullAsync(
                await _appStore.FindByApplicationNameAsync(applicationName, cancellationToken),
                Read,
                cancellationToken);

    public async Task<ApplicationPart?> GetPartByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default) =>
        await _authorizationService
            .RuleFor<ApplicationPart>()
            .AuthorizeOrNullAsync(
                await _appStore.GetPartByIdAsync(id, cancellationToken),
                Read,
                cancellationToken);

    public async Task<IReadOnlyList<Application>> Search(
        int skip,
        int take,
        string? search,
        CancellationToken cancellationToken)
    {
        var session = await _sessionAccessor.GetSession(cancellationToken);
        if (session is null)
        {
            return Array.Empty<Application>();
        }

        return await _appStore.Search(
            skip,
            take,
            session.GetNamespacesWithAccess(Scope.Application, Read),
            search,
            cancellationToken);
    }

    public async Task<Application> CreateAsync(
        string name,
        string @namespace,
        IEnumerable<string>? parts = null,
        CancellationToken cancellationToken = default)
    {
        Application application = new(Guid.NewGuid(), name, @namespace);

        if (!await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(application, Write, cancellationToken))
        {
            throw new UnauthorizedOperationException();
        }

        List<IChange> changeLogs = new();
        List<ApplicationPart> applicationParts = new();

        CreateApplicationChange applicationLog = new(
            application.Id,
            application.Version,
            application with { Parts = new List<ApplicationPart>() });

        changeLogs.Add(applicationLog);

        if (parts is not null)
        {
            foreach (var part in parts)
            {
                application = application with { Version = application.Version + 1 };

                ApplicationPart applicationPart = new(Guid.NewGuid(), part);
                AddPartToApplicationChange log = new(application.Id,
                    application.Version,
                    applicationPart.Id,
                    applicationPart.Version,
                    applicationPart);
                changeLogs.Add(log);
                applicationParts.Add(applicationPart);
            }
        }

        application = application with
        {
            Version = application.Version + 1,
            Parts = applicationParts
        };

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(changeLogs, cancellationToken);
            await _appStore.AddAsync(application, cancellationToken);

            transaction.Complete();
        }

        return application;
    }

    public async Task<Application> RenameAsync(
        Guid applicationId,
        string name,
        CancellationToken cancellationToken = default)
    {
        Application? application =
            await _appStore.GetByIdAsync(applicationId, cancellationToken);

        if (application is null)
        {
            throw new EntityIdInvalidException(nameof(Application), applicationId);
        }

        if (!await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(application, Write, cancellationToken))
        {
            throw new EntityIdInvalidException(nameof(Application), applicationId);
        }

        application = application with { Name = name, Version = application.Version + 1 };

        RenameApplicationChange log = new(application.Id, application.Version, name);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _appStore.ReplaceAsync(application, cancellationToken);

            transaction.Complete();
        }

        return application;
    }

    public async Task<ApplicationPart> RenamePartAsync(
        Guid applicationPartId,
        string name,
        CancellationToken cancellationToken = default)
    {
        Application? application =
            await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedFromAsync(application, Write, cancellationToken))
        {
            throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
        }

        ApplicationPart? applicationPart =
            application?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

        if (application is null || applicationPart is null)
        {
            throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
        }

        application = application with
        {
            Version = application.Version + 1,
            Parts = application.Parts.Replace(applicationPart,
                () => applicationPart with { Version = applicationPart.Version + 1, Name = name })
        };

        RenameApplicationPartChange log =
            new(application.Id,
                name,
                application.Version,
                applicationPart.Id,
                applicationPart.Version);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _appStore.ReplaceAsync(application, cancellationToken);

            transaction.Complete();
        }

        return applicationPart;
    }

    public async Task<ApplicationPart> AddComponentsToPartAsync(
        Guid applicationPartId,
        IEnumerable<Guid> componentIds,
        CancellationToken cancellationToken = default)
    {
        Application? application =
            await _appStore.GetByPartIdAsync(applicationPartId, cancellationToken);

        if (!await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedFromAsync(application, Write, cancellationToken))
        {
            throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
        }

        ApplicationPart? applicationPart =
            application?.Parts.FirstOrDefault(p => p.Id == applicationPartId);

        if (application is null || applicationPart is null)
        {
            throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
        }

        IReadOnlyCollection<Component> components =
            await _compStore.GetManyByIdAsync(componentIds, cancellationToken);

        List<AddComponentToApplicationPartChange> changeLogs = new();

        int applicationVersion = application.Version;
        foreach (Component component in components)
        {
            if (applicationPart.Components.All(t => t.ComponentId != component.Id))
            {
                applicationVersion++;
                applicationPart = applicationPart with { Version = applicationPart.Version + 1 };

                ApplicationPartComponent applicationPartComponent =
                    new(Guid.NewGuid(), component.Id, component.Values);

                AddComponentToApplicationPartChange log = new(application.Id,
                    application.Version,
                    applicationPartId,
                    applicationPart.Version,
                    applicationPartComponent.Id,
                    applicationPartComponent.Version,
                    applicationPartComponent);

                applicationPart.Components.Add(applicationPartComponent);
                changeLogs.Add(log);
            }
        }

        application = application with { Version = applicationVersion };

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(changeLogs, cancellationToken);
            await _appStore.ReplaceAsync(application, cancellationToken);

            transaction.Complete();
        }

        return applicationPart;
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

        if (!await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(application, Write, cancellationToken))
        {
            throw new ApplicationNotFoundException(applicationId);
        }

        if (application.Parts.Any(x => x.Name == partName))
        {
            throw new NameTakenException(partName);
        }

        ApplicationPart newApplicationPart = new(Guid.NewGuid(), partName);

        application.Parts.Add(newApplicationPart);
        application = application with { Version = application.Version + 1 };

        AddPartToApplicationChange log = new(
            application.Id,
            application.Version,
            newApplicationPart.Id,
            newApplicationPart.Version,
            newApplicationPart);

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

        if (!await _authorizationService
                .RuleFor<Application>()
                .IsAuthorizedAsync(application, Write, cancellationToken))
        {
            throw new ApplicationPartNotFoundException(applicationPartId);
        }

        var version = application.Version + 1;
        application = application with
        {
            Version = version,
            Parts = application.Parts.Where(x => x.Id != applicationPart.Id).ToArray()
        };
        applicationPart = applicationPart with { Version = application.Version + 1 };

        RemovePartFromApplicationChange log = new(
            application.Id,
            applicationPart,
            application.Version,
            applicationPart.Id,
            applicationPart.Version);

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

        if (!await _authorizationService
                .RuleFor<ApplicationPart>()
                .IsAuthorizedFromAsync(application, Write, cancellationToken))
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

        var version = application.Version + 1;
        application = application with
        {
            Version = version,
            Parts = application.Parts.Replace(applicationPart,
                () =>
                    applicationPart with
                    {
                        Version = version,
                        Components = applicationPart.Components.Where(
                                x => x.Id != applicationPartComponent.Id
                            )
                            .ToArray()
                    })
        };
        applicationPartComponent = applicationPartComponent with
        {
            Version = application.Version + 1
        };

        RemoveComponentFromApplicationPartChange log = new(
            application.Id,
            application.Version,
            applicationPart.Id,
            applicationPart.Version,
            applicationPartComponent.Id,
            applicationPartComponent.Version,
            applicationPartComponent);

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
        JsonElement values,
        CancellationToken cancellationToken = default)
    {
        Application? application =
            await _appStore.GetByComponentPartIdAsync(partComponentId, cancellationToken);

        if (application is null)
        {
            throw new ApplicationPartComponentNotFoundException(partComponentId);
        }

        if (!await _authorizationService
                .RuleFor<ApplicationPartComponent>()
                .IsAuthorizedFromAsync(application, Write, cancellationToken))
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

      _schemaValidator.ValidateValues(values, component.Schema);

        var version = application.Version + 1;
        application = application with
        {
            Version = version,
            Parts = application.Parts.Replace(applicationPart,
                () =>
                    applicationPart with
                    {
                        Version = version,
                        Components = applicationPart.Components.Replace(
                            applicationPartComponent,
                            () => applicationPartComponent with
                            {
                                Version = version,
                                Values = values.ToString()
                            }
                        )
                    })
        };

        ApplicationPartComponentValuesChange log = new(
            application.Id,
            applicationPart.Id,
            applicationPartComponent.Id,
            applicationPartComponent.Values ?? "",
            application.Version,
            applicationPart.Version,
            applicationPartComponent.Version);

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            await _changeLogService.CreateAsync(log, cancellationToken);
            await _appStore.ReplaceAsync(application, cancellationToken);

            transaction.Complete();
        }

        return applicationPartComponent;
    }
}
