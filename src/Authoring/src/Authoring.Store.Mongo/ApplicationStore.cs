using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.Application>;

namespace Confix.Authoring.Store.Mongo
{
    public class ApplicationStore : IApplicationStore
    {
        private readonly IConfixAuthorDbContext _dbContext;

        public ApplicationStore(IConfixAuthorDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Application?> GetByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Applications
                .AsQueryable()
                .Where(x => x.Id == id)
                .SingleAsync(cancellationToken);
        }

        public Task<Application?> GetByPartIdAsync(
            Guid partId,
            CancellationToken cancellationToken) =>
            _dbContext.Applications.AsQueryable()
                .FirstOrDefaultAsync(
                    x => x.Parts.Any(p => p.Id == partId),
                    cancellationToken)!;

        public Task<Application?> GetByComponentPartIdAsync(
            Guid componentPartId,
            CancellationToken cancellationToken) =>
            _dbContext.Applications.AsQueryable()
                .FirstOrDefaultAsync(
                    x => x.Parts.Any(p => p.Components.Any(y => y.Id == componentPartId)),
                    cancellationToken)!;


        public async Task<ApplicationPart?> GetPartByIdAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            Application? application = await GetByPartIdAsync(id, cancellationToken);
            return application?.Parts.First(t => t.Id == id);
        }

        public async Task<IReadOnlyCollection<Application>> GetManyByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            return await _dbContext.Applications
                .AsQueryable()
                .Where(x => ids.Contains(x.Id))
                .ToListAsync(cancellationToken);
        }

        public async Task<IReadOnlyCollection<ApplicationPart>> GetManyPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            List<Application> applications =
                await _dbContext.Applications
                    .AsQueryable()
                    .Where(x => x.Parts.Any(p => ids.Contains(p.Id)))
                    .ToListAsync(cancellationToken);

            return applications
                .SelectMany(x => x.Parts)
                .Where(x => ids.Contains(x.Id))
                .ToList();
        }

        public async Task<IReadOnlyCollection<ApplicationPartComponent>>
            GetManyComponentPartsByIdAsync(
            IEnumerable<Guid> ids,
            CancellationToken cancellationToken)
        {
            var idSet = ids.ToHashSet();
            FilterDefinition<Application> filter = Filter.In(
                $"{nameof(Application.Parts)}.{nameof(ApplicationPart.Components)}.{nameof(ApplicationPartComponent.Id)}",
                idSet);

            List<Application> result =
                await _dbContext.Applications.Find(filter).ToListAsync(cancellationToken);
            return result.SelectMany(x => x.Parts)
                .SelectMany(x => x.Components)
                .Where(x => idSet.Contains(x.Id))
                .DistinctBy(x => x.Id)
                .ToList();
        }

        public IQueryable<Application> Query() =>
            _dbContext.Applications.AsQueryable();

        public async Task<IEnumerable<Application>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _dbContext.Applications
                .AsQueryable()
                .ToListAsync(cancellationToken);
        }

        public async Task AddAsync(
            Application application,
            CancellationToken cancellationToken)
        {
            if (application is null)
            {
                throw new ArgumentNullException(nameof(application));
            }

            await _dbContext.Applications.InsertOneAsync(
                application,
                options: null,
                cancellationToken);
        }

        public async Task ReplaceAsync(
            Application application,
            CancellationToken cancellationToken)
        {
            if (application is null)
            {
                throw new ArgumentNullException(nameof(application));
            }

            await _dbContext.Applications.ReplaceOneAsync(
                x => x.Id == application.Id,
                application,
                new ReplaceOptions { IsUpsert = false },
                cancellationToken);
        }
    }
}
