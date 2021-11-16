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

        public async Task RenameAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(applicationId));
            }

            UpdateResult result = await _dbContext.Applications.UpdateOneAsync(
                Filter.Eq(t => t.Id, applicationId),
                Update.Set(t => t.Name, name),
                cancellationToken: cancellationToken);

            if (result.MatchedCount == 0)
            {
                throw new EntityIdInvalidException(nameof(Application), applicationId);
            }
        }

        public async Task RenamePartAsync(
            Guid applicationPartId,
            string name,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(applicationPartId));
            }

            Application application =
                await _dbContext.Applications
                    .AsQueryable()
                    .FirstOrDefaultAsync(
                        x => x.Parts.Any(p => p.Id == applicationPartId),
                        cancellationToken);

            if (application is null)
            {
                throw new EntityIdInvalidException(nameof(ApplicationPart), applicationPartId);
            }

            application.Parts.First(t => t.Id == applicationPartId).Name = name;
            await ReplaceAsync(application, cancellationToken);
        }

        public async Task<Application?> AddPartToApplicationAsync(
            Guid applicationId,
            string name,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException(nameof(applicationId));
            }

            ApplicationPart part = new()
            {
                Id = Guid.NewGuid(),
                Name = name,
                Components = Array.Empty<ApplicationPartComponent>()
            };

            FilterDefinition<Application> filter = Filter.Eq(x => x.Id, applicationId);
            UpdateDefinition<Application> update = Update.AddToSet(x => x.Parts, part);
            FindOneAndUpdateOptions<Application> options = new()
            {
                IsUpsert = false, ReturnDocument = ReturnDocument.After
            };

            Application? application = await _dbContext.Applications
                .FindOneAndUpdateAsync(filter, update, options, cancellationToken);

            return application;
        }

        public async Task<Application?> RemovePartAsync(
            Guid applicationPartId,
            CancellationToken cancellationToken)
        {
            FilterDefinition<Application> filter = Filter
                .Eq($"{nameof(Application.Parts)}.{nameof(ApplicationPart.Id)}", applicationPartId);

            FilterDefinition<ApplicationPart> pullFilter =
                Builders<ApplicationPart>.Filter.Eq(x => x.Id, applicationPartId);

            UpdateDefinition<Application> update = Update.PullFilter(x => x.Parts,pullFilter);

            FindOneAndUpdateOptions<Application> options = new()
            {
                IsUpsert = false, ReturnDocument = ReturnDocument.After
            };

            Application? application = await _dbContext.Applications
                .FindOneAndUpdateAsync(filter, update, options, cancellationToken);

            return application;
        }
    }
}
