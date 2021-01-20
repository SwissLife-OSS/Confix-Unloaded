using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store.Mongo
{
    public interface IVariableValueStore
    {
        Task<IEnumerable<VariableValue>> GetByFilterAsync(
            VariableValueFilter filter,
            CancellationToken cancellationToken);

        Task<VariableValue> GetByIdAsync(
            string id,
            CancellationToken cancellationToken);

        Task<IEnumerable<VariableValue>> GetManyAsync(
            IEnumerable<string> ids,
            CancellationToken cancellationToken);

        Task<VariableValue> SaveAsync(
            VariableValue value,
            CancellationToken cancellationToken);
    }
}
