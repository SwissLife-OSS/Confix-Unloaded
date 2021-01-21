using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<IEnumerable<Application>> GetManyAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Applications.AsQueryable()
                .Where(x => ids.Contains(x.Id))
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

        public async Task<IEnumerable<ApplicationPart>> GetManyPartsAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            List<Application> applications = await _dbContext.Applications.AsQueryable()
                .Where(x => x.Parts.Any(p => ids.Contains(p.Id)))
                .ToListAsync(cancellationToken);

            return applications
                .SelectMany(x => x.Parts)
                .Where(x => ids.Contains(x.Id));
        }
    }
}
