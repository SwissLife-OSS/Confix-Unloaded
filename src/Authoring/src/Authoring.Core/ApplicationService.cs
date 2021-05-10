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
        private readonly IApplicationStore _applicationStore;

        public ApplicationService(IApplicationStore applicationStore)
        {
            _applicationStore = applicationStore;
        }

        public async Task<IEnumerable<Application>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _applicationStore.GetAllAsync(cancellationToken);
        }

        public async Task<Application> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _applicationStore.GetByIdAsync(id, cancellationToken);
        }

        public async Task<IEnumerable<Application>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _applicationStore.GetManyAsync(ids, cancellationToken);
        }

        public async Task<Application> AddAsync(
            AddApplicationRequest request,
            CancellationToken cancellationToken)
        {
            var app = new Application
            {
                Id = Guid.NewGuid(),
                Name = request.Name
            };

            if (request is { Parts: { Count: > 0 } parts })
            {
                app.Parts = parts.Select(
                    name => new ApplicationPart
                    {
                        Id = Guid.NewGuid(),
                        Name = name
                    }).ToList();
            }

            return await _applicationStore.AddAsync(app, cancellationToken);
        }

        public Task<Application> RenameAsync(
            RenameApplicationRequest request,
            CancellationToken cancellationToken)
        {
            // TODO : implement
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ApplicationPart>> GetManyPartsAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _applicationStore.GetManyPartsAsync(ids, cancellationToken);
        }

        public async Task<ApplicationPart> UpdateApplicationPartAsync(
            UpdateApplicationPartRequest request,
            CancellationToken cancellationToken)
        {
            Application? application =
                await _applicationStore.GetByIdAsync(
                    request.ApplicationId,
                    cancellationToken);

            if (application is null)
            {
                throw new EntityIdInvalidException(nameof(Application), request.ApplicationId);
            }

            ApplicationPart? part = application.Parts.FirstOrDefault(x => x.Id == request.PartId);

            if (part is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), request.ApplicationId);
            }

            if(request.Components is not null)
            {
                part.Components = request.Components.Select(
                    componentId => new ApplicationPartComponent
                    {
                        ComponentId = componentId
                    }).ToList();
            }

            if (request.Name is not null)
            {
                part.Name = request.Name;
            }

            await _applicationStore.UpdateAsync(application, cancellationToken);

            return part;
        }
    }
}
