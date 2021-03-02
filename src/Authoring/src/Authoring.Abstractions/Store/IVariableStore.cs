using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    public interface IVariableStore
    {
        Task<Variable> CreateAsync(Variable Variable, CancellationToken cancellationToken);
        Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken);
        Task<Variable> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<IEnumerable<Variable>> GetManyAsync(IEnumerable<Guid> ids, CancellationToken cancellationToken);
        Task<Variable> UpdateAsync(Variable Variable, CancellationToken cancellationToken);
    }
}
