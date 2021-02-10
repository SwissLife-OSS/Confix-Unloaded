using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;

namespace Confix.Authoring
{
    public interface IApplicationService
    {
        Task<Application> AddAsync(
            AddApplicationRequest request,
            CancellationToken cancellationToken);

        Task<Application> RenameAsync(
            RenameApplicationRequest request,
            CancellationToken cancellationToken);

        Task<IEnumerable<Application>> GetAllAsync(CancellationToken cancellationToken);

        Task<IEnumerable<Application>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);

        Task<IEnumerable<ApplicationPart>> GetManyPartsAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);


        Task<ApplicationPart> UpdateApplicationPartAsync(UpdateApplicationPartRequest request, CancellationToken cancellationToken);
    }

    public record AddApplicationRequest(
        string Name,
        string Namespace,
        IReadOnlyList<string>? Parts = null);

    public record RenameApplicationRequest(
        Guid ApplicationId,
        string Name);

    public record UpdateApplicationPartRequest(Guid ApplicationId, Guid PartId)
    {
        public string? Name { get; init; }

        public IEnumerable<Guid>? Components { get; init; }
    }
}
