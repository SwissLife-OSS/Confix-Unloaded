using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store.Mongo
{
    public interface IVariableValueStore
    {
        Task<VariableValue> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<IEnumerable<VariableValue>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<VariableValue> SaveAsync(VariableValue value, CancellationToken cancellationToken);
    }
}