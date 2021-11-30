using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store
{
    public interface IVariableStore
    {
        Task<Variable> CreateAsync(Variable variable, CancellationToken cancellationToken);
        Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken);
        Task<Variable> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken);

        Task<IEnumerable<Variable>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken);

        Task<Variable> UpdateAsync(Variable variable, CancellationToken cancellationToken);
        IQueryable<Variable> Query();
    }
}
