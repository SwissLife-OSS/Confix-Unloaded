using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ComponentStore : IComponentStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ComponentStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Component> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Components.AsQueryable()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Components.AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public IQueryable<Component> Query() =>
        _dbContext.Components.AsQueryable();

    public async Task<Component> AddAsync(
        Component component,
        CancellationToken cancellationToken)
    {
        await _dbContext.Components.InsertOneAsync(
            component,
            options: null,
            cancellationToken);

        return component;
    }

    public async Task<Component> UpdateAsync(
        Component component,
        CancellationToken cancellationToken)
    {
        await _dbContext.Components.ReplaceOneAsync(
            x => x.Id == component.Id,
            component,
            new ReplaceOptions { IsUpsert = false },
            cancellationToken);

        return component;
    }
}
