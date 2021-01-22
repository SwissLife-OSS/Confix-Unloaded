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

        public async Task<IEnumerable<ApplicationPart>> GetManyPartsAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _applicationStore.GetManyPartsAsync(ids, cancellationToken);
        }

        public async Task<Application> UpdateApplicationPartAsync(
            UpdateApplicationPartRequest request,
            CancellationToken cancellationToken)
        {
            Application application = await _applicationStore.GetByIdAsync(
                request.ApplicationId,
                cancellationToken);

            ApplicationPart? part = application.Parts.FirstOrDefault(x => x.Id == request.PartId);

            if (part is not null)
            {
                if(part is { Components: { } components })
                {
                    part.Components = components.Select(
                        component => new ApplicationPartComponent
                        {
                            ComponentId = component.ComponentId
                        }).ToList();
                }

                if (request.Name is not null)
                {
                    part.Name = request.Name;
                }

                await _applicationStore.UpdateAsync(application, cancellationToken);
            }

            return application;
        }
    }
}
