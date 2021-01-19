using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public interface IComponentService
    {
        Task<Component> AddAsync(AddComponentRequest request, CancellationToken cancellationToken);
        Task<IEnumerable<Component>> GetAllAsync(CancellationToken cancellationToken);
        Task<IEnumerable<Component>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<Component> UpdateSchemaAsync(UpdateComponentSchemaRequest request, CancellationToken cancellationToken);
    }

    public record AddComponentRequest(string Name);

    public record UpdateComponentSchemaRequest(Guid Id, string Schema);

}
