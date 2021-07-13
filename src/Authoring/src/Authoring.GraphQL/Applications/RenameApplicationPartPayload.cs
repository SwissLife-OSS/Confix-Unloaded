using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;

namespace Confix.Authoring.GraphQL.Applications
{
    public class RenameApplicationPartPayload
    {
        private readonly Guid _applicationPartId;
        private Application? _application;

        public RenameApplicationPartPayload(Guid applicationPartId)
        {
            _applicationPartId = applicationPartId;
        }

        public async Task<Application?> GetApplicationAsync(
            [Service] IApplicationService applicationService,
            CancellationToken cancellationToken)
        {
            if (_application is null)
            {
                _application = await applicationService.GetByPartIdAsync(
                    _applicationPartId,
                    cancellationToken);
            }

            return _application;
        }

        public async Task<ApplicationPart?> GetApplicationPartAsync(
            [Service] IApplicationService applicationService,
            CancellationToken cancellationToken)
        {
            Application? application = await GetApplicationAsync(
                applicationService,
                cancellationToken);
            return application?.Parts.FirstOrDefault(t => t.Id == _applicationPartId);
        }
    }
}
