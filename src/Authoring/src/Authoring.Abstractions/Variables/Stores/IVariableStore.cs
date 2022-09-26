using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Confix.Authoring.Store;

public interface IVariableStore
{
    Task<Variable?> CreateAsync(Variable? variable, CancellationToken cancellationToken);

    Task<IEnumerable<Variable>> GetAllByNamespacesAsync(
        IEnumerable<string> namespaces,
        CancellationToken cancellationToken);

    Task<Variable?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<IEnumerable<Variable?>> GetAllAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken);

    Task<IReadOnlyList<Variable?>> GetByNamesAsync(
        IEnumerable<string> names,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
        Guid partId,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetByApplicationIdAsync(
        Guid applicationId,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetGlobalVariableValue(CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
        Guid partId,
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetByApplicationIdAsync(
        Guid applicationId,
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken);

    Task<IEnumerable<VariableValue>> GetGlobalVariableValue(
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken);

    Task<IEnumerable<Variable?>> GetManyAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken);

    Task<Variable?> UpdateAsync(Variable? variable, CancellationToken cancellationToken);

    IQueryable<Variable?> Query();
}
