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
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _dbContext.VariableValues.AsQueryable()
                .Where(x => ids.Contains(x.Id))
                .ToListAsync(cancellationToken);
        }

        public async Task<VariableValue> SaveAsync(
            VariableValue value,
            CancellationToken cancellationToken)
        {
            await _dbContext.VariableValues.ReplaceOneAsync(
                x => x.Id == value.Id,
                value,
                options: new ReplaceOptions { IsUpsert = true },
                cancellationToken);

            return value;
        }
    }
}
