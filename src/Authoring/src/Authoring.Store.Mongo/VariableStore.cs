using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo
{
    public class VariableStore : IVariableStore
    {
        private readonly IConfixAuthorDbContext _dbContext;

        public VariableStore(IConfixAuthorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Variable>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _dbContext.Variables.AsQueryable()
                .ToListAsync(cancellationToken);
        }

        public async Task<Variable> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Variables.AsQueryable()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<IEnumerable<VariableValue>> GetByApplicationPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken)
        {
            FilterDefinition<VariableValue> filter =
                Builders<VariableValue>.Filter.Eq(x => x.Key.PartId, partId);
            return await _dbContext.VariableValues.Find(filter).ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<Variable>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Variables.AsQueryable()
                .Where(x => ids.Contains(x.Id))
                .ToListAsync(cancellationToken);
        }

        public async Task<Variable> CreateAsync(
            Variable Variable,
            CancellationToken cancellationToken)
        {
            await _dbContext.Variables.InsertOneAsync(
                Variable,
                options: null,
                cancellationToken);

            return Variable;
        }

        public async Task<Variable> UpdateAsync(
            Variable Variable,
            CancellationToken cancellationToken)
        {
            await _dbContext.Variables.ReplaceOneAsync(
                x => x.Id == Variable.Id,
                Variable,
                new ReplaceOptions { IsUpsert = false },
                cancellationToken);

            return Variable;
        }

        public IQueryable<Variable> Query() => _dbContext.Variables.AsQueryable();
    }
}
