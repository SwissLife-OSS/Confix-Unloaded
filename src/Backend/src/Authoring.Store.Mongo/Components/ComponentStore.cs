using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static MongoDB.Driver.Builders<Confix.Authoring.Component>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ComponentStore : IComponentStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ComponentStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Component> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Components
            .Find(Filter.Eq(x => x.Id, id))
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Component>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Components
            .Find(Filter.In(x => x.Id, ids))
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Component>> GetByFilterAsync(
        IEnumerable<string> namespaces,
        IEnumerable<ComponentScope> scopes,
        string? search,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(x => x.Namespace, namespaces);

        if (scopes.Any())
        {
            filter &= Filter.Or(scopes.Select(s => Filter.AnyEq(x => x.Scopes, s)));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            filter &= Filter.Regex(x => x.Name, new BsonRegularExpression(search, "i"));
        }
        return await _dbContext.Components
            .Find(filter)
            .SortByDescending(x => x.Name)
            .Skip(skip)
            .Limit(take)
            .ToListAsync(cancellationToken);
    }

    public async Task<Component> AddAsync(Component component, CancellationToken cancellationToken)
    {
        await _dbContext.Components.InsertOneAsync(component, null, cancellationToken);

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
