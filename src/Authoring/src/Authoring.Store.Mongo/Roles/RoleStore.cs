using Confix.Authentication.Authorization;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

public class RoleStore : IRoleStore
{
    private readonly IConfixAuthorDbContext _dbContext;

    public RoleStore(IConfixAuthorDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<Role>> GetAllAsync(CancellationToken cancellationToken)
    {
        var filter = Builders<Role>.Filter.Empty;

        return await _dbContext.Roles.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Role?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Builders<Role>.Filter.Eq(x => x.Id, id);

        return await _dbContext.Roles.Find(filter).FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Role>> GetByIdsAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        var filter = Builders<Role>.Filter.In(x => x.Id, ids);

        return await _dbContext.Roles.Find(filter).ToListAsync(cancellationToken);
    }

    public async Task<Role> UpsertAsync(Role group, CancellationToken cancellationToken)
    {
        var filter = Builders<Role>.Filter.Eq(x => x.Id, group.Id);

        var options = new FindOneAndReplaceOptions<Role> { IsUpsert = true };

        return await _dbContext.Roles
            .FindOneAndReplaceAsync(filter, group, options, cancellationToken);
    }

    public async Task<Role?> DeleteByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var filter = Builders<Role>.Filter.Eq(x => x.Id, id);

        return await _dbContext.Roles
            .FindOneAndDeleteAsync(filter, default, cancellationToken);
    }

    public IQueryable<Role> Query() => _dbContext.Roles.AsQueryable();
}
