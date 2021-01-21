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
                Name = request.Name,
                Parts = request.Parts?.Select(x => new ApplicationPart
                {
                    Id = Guid.NewGuid(),
                    Name = x
                }) ?? Array.Empty<ApplicationPart>()
            };

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

            if (part != null)
            {
                part.Components = request.Components?.Select(x => new ApplicationPartComponent
                {
                    ComponentId = x
                }) ?? Array.Empty< ApplicationPartComponent>();

                if (request.Name != null)
                {
                    part.Name = request.Name;
                }

                await _applicationStore.UpdateAsync(application, cancellationToken);
            }

            return application;
        }
    }
}
