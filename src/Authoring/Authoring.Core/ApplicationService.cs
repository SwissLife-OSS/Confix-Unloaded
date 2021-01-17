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
                    Name = x
                }) ?? Array.Empty<ApplicationPart>()
            };

            return await _applicationStore.AddAsync(app, cancellationToken);
        }
    }
}
