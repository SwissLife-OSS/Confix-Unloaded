using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Applications
{
    public class RenameApplicationPayload
    {
        private readonly Guid? _applicationId;

        public RenameApplicationPayload(Guid? applicationId)
        {
            _applicationId = applicationId;
        }

        public Task<Application?> GetApplicationAsync(
            IApplicationDataLoader applicationById,
            CancellationToken cancellationToken) =>
            _applicationId.HasValue
                ? applicationById.LoadAsync(_applicationId.Value, cancellationToken)
                : Task.FromResult<Application?>(null);
    }
}
