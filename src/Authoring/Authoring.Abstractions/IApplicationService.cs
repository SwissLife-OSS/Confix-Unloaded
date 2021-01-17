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
    }

    public record AddApplicationRequest(string Name)
    {
        public IEnumerable<string>? Parts { get; init; }
    }

}
