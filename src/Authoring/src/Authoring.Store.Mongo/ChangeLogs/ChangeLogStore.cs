using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store.Mongo.Configuration;
using MongoDB.Driver;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.ChangeLog>;

namespace Confix.Authoring.Store.Mongo;

public class ChangeLogStore
    : IChangeLogStore
{
    private readonly IConfixAuthorDbContext _dbContext;

    public ChangeLogStore(IConfixAuthorDbContext dbContext)
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
        IReadOnlyList<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter = Filter.In(x => x.Id, applicationIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationIdsAsync(
        IReadOnlyList<Guid> applicationIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ApplicationId, applicationIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByApplicationPartIdAsync(
        IReadOnlyList<Guid> partIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ApplicationPartId, partIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByPartComponentIdAsync(
        IReadOnlyList<Guid> partComponentIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.PartComponentId, partComponentIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByComponentIdAsync(
        IReadOnlyList<Guid> componentIds,
        CancellationToken cancellationToken)
    {
        FilterDefinition<ChangeLog> filter =
            Filter.In(WellKnownChangeLogFields.ComponentId, componentIds);
        SortDefinition<ChangeLog> sort = Sort.Descending(x => x.ModifiedAt);

        return await _dbContext.ChangeLogs.Find(filter).Sort(sort).ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<ChangeLog>> GetByVariableIdAsync(
        IReadOnlyList<Guid> variableIds,
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
