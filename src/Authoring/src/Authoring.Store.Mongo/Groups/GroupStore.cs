using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authentication.Authorization;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo;

public class GroupStore : IGroupStore
{
    private readonly IConfixAuthorDbContext _dbContext;

    public GroupStore(IConfixAuthorDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<Group>> GetAllAsync(CancellationToken cancellationToken)
    {
        var filter = Builders<Group>.Filter.Empty;

        return await _dbContext.Groups.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Group?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Builders<Group>.Filter.Eq(x => x.Id, id);

        return await _dbContext.Groups.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Group>?> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Group>.Filter.In(x => x.Id, ids);

        return await _dbContext.Groups.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Group> UpsertAsync(Group group, CancellationToken cancellationToken)
    {
        var filter = Builders<Group>.Filter.Eq(x => x.Id, group.Id);

        var options = new FindOneAndReplaceOptions<Group> { IsUpsert = true };

        return await _dbContext.Groups
            .FindOneAndReplaceAsync(filter, group, options, cancellationToken);
    }

    public async Task<Group?> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Builders<Group>.Filter.Eq(x => x.Id, id);

        return await _dbContext.Groups
            .FindOneAndDeleteAsync(filter, default, cancellationToken);
    }

    public IQueryable<Group> Query() => _dbContext.Groups.AsQueryable();
}
