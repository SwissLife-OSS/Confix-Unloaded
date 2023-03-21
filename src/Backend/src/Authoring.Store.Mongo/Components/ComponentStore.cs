using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using C = MongoDB.Driver.Builders<Confix.Authoring.Component>;
using CS = MongoDB.Driver.Builders<Confix.Authoring.ComponentScope>;
using static Confix.Authoring.Store.Mongo.Builders;

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

    public async Task<IReadOnlyList<Component>> Search(
        int skip,
        int take,
        IEnumerable<string> namespaces,
        Guid? applicationId,
        Guid? applicationPartId,
        string? search,
        CancellationToken cancellationToken)
    {
        var namespaceFilter = Filter<Component>()
            .ElemMatch(x => x.Scopes,
                And(
                    Filter<ComponentScope>().In(x => x.Namespace, namespaces),
                    Filter<ComponentScope>().Null(x => x.ApplicationId),
                    Filter<ComponentScope>().Null(x => x.ApplicationPartId)
                ));

        var scopeFilter = namespaceFilter;

        if (applicationId is not null)
        {
            var applicationIdFilter = Filter<Component>()
                .ElemMatch(x => x.Scopes,
                    And(
                        Filter<ComponentScope>().In(x => x.Namespace, namespaces),
                        Filter<ComponentScope>().Eq(x => x.ApplicationId, applicationId),
                        Filter<ComponentScope>().Null(x => x.ApplicationPartId)
                    ));

            scopeFilter |= applicationIdFilter;

            if (applicationPartId is not null)
            {
                scopeFilter |= Filter<Component>()
                    .ElemMatch(x => x.Scopes,
                        And(
                            Filter<ComponentScope>().In(x => x.Namespace, namespaces),
                            Filter<ComponentScope>().Eq(x => x.ApplicationId, applicationId),
                            Filter<ComponentScope>()
                                .Eq(x => x.ApplicationPartId, applicationPartId)
                        ));
            }
        }

        var filter = scopeFilter;

        if (!string.IsNullOrEmpty(search))
        {
            filter &= Filter<Component>()
                .Regex(x => x.Name, new BsonRegularExpression(search, "i"));
        }

        return await _dbContext.Components
            .Find(filter)
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

public static class Builders
{
    public static FilterDefinitionBuilder<T> Filter<T>() => Builders<T>.Filter;

    public static FilterDefinition<T> And<T>(params FilterDefinition<T>[] filters)
        => Builders<T>.Filter.And(filters);
}
