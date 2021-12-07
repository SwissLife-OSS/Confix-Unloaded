using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo;

public class EnvironmentStore : IEnvironmentStore
{
    private readonly IConfixAuthorDbContext _dbContext;

    public EnvironmentStore(IConfixAuthorDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Environment?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Environments
            .AsQueryable()
            .Where(x => x.Id == id)
            .SingleAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<Environment>> GetManyByIdAsync(
        IEnumerable<Guid> ids,
        CancellationToken cancellationToken)
    {
        return await _dbContext.Environments
            .AsQueryable()
            .Where(x => ids.Contains(x.Id))
            .ToListAsync(cancellationToken);
    }

    public Task AddAsync(Environment environment, CancellationToken cancellationToken)
    {
        return _dbContext.Environments.InsertOneAsync(environment, default, cancellationToken);
    }

    public async Task<Environment?> RenameAsync(
        Guid environmentId,
        string name,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(name))
        {
            throw new ArgumentNullException(nameof(environmentId));
        }

        Environment? result = await _dbContext.Environments.FindOneAndUpdateAsync(
            Builders<Environment>.Filter.Eq(t => t.Id, environmentId),
            Builders<Environment>.Update.Set(t => t.Name, name),
            new FindOneAndUpdateOptions<Environment>(){ReturnDocument = ReturnDocument.After},
            cancellationToken: cancellationToken);

        return result;
    }

    public async Task<Environment?> RemoveByIdAsync(
        Guid environmentId,
        CancellationToken cancellationToken)
    {
        FilterDefinition<Environment>? filter =
            Builders<Environment>.Filter.Eq(x => x.Id, environmentId);

        return await _dbContext.Environments
            .FindOneAndDeleteAsync(filter, default, cancellationToken);
    }

    public IQueryable<Environment> SearchAsync(
        string? search,
        CancellationToken cancellationToken = default) =>
        search is null
            ? _dbContext.Environments.AsQueryable()
            : _dbContext.Environments.AsQueryable().Where(x => x.Name.Contains(search));
}
