using Confix.Authoring.Store.Mongo.Configuration;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.ChangeLog>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ChangeLogStore : IChangeLogStore
{
    private readonly IAuthoringDbContext _dbContext;

    public ChangeLogStore(IAuthoringDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(ChangeLog changeLog, CancellationToken cancellationToken)
    {
        if (changeLog is null)
        {
            throw new ArgumentNullException(nameof(changeLog));
        }

        await _dbContext.ChangeLogs.InsertOneAsync(changeLog, null, cancellationToken);
    }

    public async Task AddAsync(
        IEnumerable<ChangeLog> changeLogs,
        CancellationToken cancellationToken)
    {
        if (changeLogs is null)
        {
            throw new ArgumentNullException(nameof(changeLogs));
        }

        await _dbContext.ChangeLogs.InsertManyAsync(changeLogs, null, cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(x => x.Id, applicationIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(WellKnownChangeLogFields.ApplicationId, applicationIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationPartIdAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(WellKnownChangeLogFields.ApplicationPartId, partIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByPartComponentIdAsync(
        IEnumerable<Guid> partComponentIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(WellKnownChangeLogFields.PartComponentId, partComponentIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByComponentIdAsync(
        IEnumerable<Guid> componentIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(WellKnownChangeLogFields.ComponentId, componentIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByVariableIdAsync(
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken)
    {
        var filter = Filter.In(WellKnownChangeLogFields.VariableId, variableIds);
        var sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<ChangeLog?> GetByApplicationPartComponentIdAndVersionAsync(
        Guid partComponentId,
        int version,
        CancellationToken cancellationToken)
    {
        var filter = Filter.Eq(WellKnownChangeLogFields.PartComponentId, partComponentId) &
            Filter.Eq(WellKnownChangeLogFields.PartComponentVersion, version);

        return await _dbContext.ChangeLogs.Find(filter)
            .SingleOrDefaultAsync(cancellationToken);
    }
}
