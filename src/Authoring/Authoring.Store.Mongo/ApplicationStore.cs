using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Confix.Authoring.Store.Mongo
{
    public class ApplicationStore : IApplicationStore
    {
        private readonly IConfixAuthorDbContext _dbContext;

        public ApplicationStore(IConfixAuthorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Application>> GetAllAsync(
            CancellationToken cancellationToken)
        {
            return await _dbContext.Applications.AsQueryable()
                .ToListAsync(cancellationToken);
        }

        public async Task<Application> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Applications.AsQueryable()
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Application> AddAsync(
            Application application,
            CancellationToken cancellationToken)
        {
            await _dbContext.Applications.InsertOneAsync(
                application,
                options: null,
                cancellationToken);

            return application;
        }

        public async Task<Application> UpdateAsync(
            Application application,
            CancellationToken cancellationToken)
        {
            await _dbContext.Applications.ReplaceOneAsync(
                x => x.Id == application.Id,
                application,
                new ReplaceOptions { IsUpsert = false },
                cancellationToken);

            return application;
        }
    }
}
