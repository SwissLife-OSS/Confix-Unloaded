using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store.Mongo.Configuration;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.ChangeLog>;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ChangeLogStore
    : IChangeLogStore
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

        await _dbContext.ChangeLogs.InsertOneAsync(
            changeLog,
            options: null,
            cancellationToken);
    }

    public async Task AddAsync(
        IEnumerable<ChangeLog> changeLogs,
        CancellationToken cancellationToken)
    {
        if (changeLogs is null)
        {
            throw new ArgumentNullException(nameof(changeLogs));
        }

        await _dbContext.ChangeLogs.InsertManyAsync(
            changeLogs,
            options: null,
            cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter = Filter.In(x => x.Id, applicationIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationIdsAsync(
        IEnumerable<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ApplicationId, applicationIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationPartIdAsync(
        IEnumerable<Guid> partIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ApplicationPartId, partIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByPartComponentIdAsync(
        IEnumerable<Guid> partComponentIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.PartComponentId, partComponentIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByComponentIdAsync(
        IEnumerable<Guid> componentIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ComponentId, componentIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByVariableIdAsync(
        IEnumerable<Guid> variableIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.VariableId, variableIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<ChangeLog?> GetByApplicationPartComponentIdAndVersionAsync(
        Guid partComponentId,
        int version,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.Eq(WellKnownChangeLogFields.PartComponentId, partComponentId) &
            Filter.Eq(WellKnownChangeLogFields.PartComponentVersion, version);

        return await _dbContext.ChangeLogs.Find(filter).SingleOrDefaultAsync(cancellationToken);
    }
}
