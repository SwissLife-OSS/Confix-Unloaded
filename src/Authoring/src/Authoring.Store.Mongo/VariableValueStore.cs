using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo
{
    public class VariableValueStore : IVariableValueStore
    {
        private readonly IConfixAuthorDbContext _dbContext;

        public VariableValueStore(IConfixAuthorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<VariableValue> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.VariableValues.AsQueryable()
                .Where(x => x.Id == id)
                .SingleAsync(cancellationToken);
        }

        public async Task<VariableValue?> GetByKeyAsync(
            VariableKey key,
            CancellationToken cancellationToken)
        {
            FilterDefinition<VariableValue> keyFilter = BuildUniqueKeyFilter(key);

            return await _dbContext.VariableValues
                .Find(keyFilter, options: null)
                .SingleOrDefaultAsync(cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _dbContext.VariableValues.AsQueryable()
                .Where(x => ids.Contains(x.Id))
                .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetByFilterAsync(
            VariableValueFilter filter,
            CancellationToken cancellationToken)
        {
            FilterDefinition<VariableValue> dbFilter = BuildFindKeyFilter(filter);

            IAsyncCursor<VariableValue> cursor = await _dbContext.VariableValues.FindAsync(
                dbFilter,
                options: null,
                cancellationToken);

            return await cursor.ToListAsync(cancellationToken);
        }

        public async Task<VariableValue> SaveAsync(
            VariableValue value,
            CancellationToken cancellationToken)
        {
            await _dbContext.VariableValues.ReplaceOneAsync(
                BuildUniqueKeyFilter(value.Key),
                value,
                options: new ReplaceOptions { IsUpsert = true },
                cancellationToken);

            return value;
        }

        public async Task DeleteAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            await _dbContext.VariableValues.DeleteOneAsync(
                x => x.Id == id,
                options: null,
                cancellationToken);
        }

        private static FilterDefinition<VariableValue> BuildUniqueKeyFilter(
            VariableKey variableKey)
        {
            return Builders<VariableValue>.Filter.And(
                Builders<VariableValue>.Filter.Eq(u => u.Key.VariableId, variableKey.VariableId),
                Builders<VariableValue>.Filter.Eq(u => u.Key.ApplicationId, variableKey.ApplicationId),
                Builders<VariableValue>.Filter.Eq(u => u.Key.PartId, variableKey.PartId),
                Builders<VariableValue>.Filter.Eq(u => u.Key.EnvironmentId, variableKey.EnvironmentId));
        }

        private static FilterDefinition<VariableValue> BuildFindKeyFilter(VariableValueFilter filter)
        {
            FilterDefinition<VariableValue> dbFilter = Builders<VariableValue>
                .Filter.Eq(x => x.Key.VariableId, filter.Id);

            if (filter.EnvironmentId.HasValue)
            {
                dbFilter &= Builders<VariableValue>.Filter
                    .Eq(x => x.Key.EnvironmentId, filter.EnvironmentId.Value);
            }

            if (filter.ApplicationId.HasValue)
            {
                dbFilter &= Builders<VariableValue>.Filter
                    .Eq(x => x.Key.ApplicationId, filter.ApplicationId.Value);
            }

            if (filter.PartId.HasValue)
            {
                dbFilter &= Builders<VariableValue>.Filter
                    .Eq(x => x.Key.PartId, filter.PartId.Value);
            }

            return dbFilter;
        }
    }
}
