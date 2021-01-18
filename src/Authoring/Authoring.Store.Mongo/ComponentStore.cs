using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo
{
    public class ComponentStore : IComponentStore
    {
        private readonly IConfixAuthorDbContext _dbContext;

        public ComponentStore(IConfixAuthorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Component>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.Components.AsQueryable()
                .ToListAsync(cancellationToken);
        }

        public async Task<Component> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Components.AsQueryable()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Component> AddAsync(
            Component component,
            CancellationToken cancellationToken)
        {
            await _dbContext.Components.InsertOneAsync(
                component,
                options: null,
                cancellationToken);

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
}
