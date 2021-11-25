using System;
using System.Threading;
using System.Threading.Tasks;
using Environment = Confix.Authoring.Store.Environment;

namespace Confix.Authoring;

public interface IEnvironmentService
{
    Task<Environment?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);
    Task<Environment> CreateAsync(
        string name,
        CancellationToken cancellationToken = default);
        
    Task RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken = default);
        
}
