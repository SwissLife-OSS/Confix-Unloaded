using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public interface IApplicationService
    {
        Task<Application> AddAsync(AddApplicationRequest request, CancellationToken cancellationToken);
        Task<IEnumerable<Application>> GetAllAsync(CancellationToken cancellationToken);
        Task<IEnumerable<Application>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<Application> UpdateApplicationPartAsync(UpdateApplicationPartRequest request, CancellationToken cancellationToken);
    }

    public record AddApplicationRequest(string Name)
    {
        public IEnumerable<string>? Parts { get; init; }
    }

    public record UpdateApplicationPartRequest(Guid ApplicationId, Guid PartId)
    {
        public string? Name { get; init; }

        public IEnumerable<Guid>? Components { get; init; }
    }
}
