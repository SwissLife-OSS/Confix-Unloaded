using Confix.Authoring.Changes;
using Confix.Authoring.Variables.Changes;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.ChangeLog>;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal sealed class ChangeLogCollectionConfiguration : IMongoCollectionConfiguration<ChangeLog>
{
    public void OnConfiguring(IMongoCollectionBuilder<ChangeLog> builder)
    {
        builder
            .WithCollectionName("change_log")
            .AddBsonClassMap<ChangeLog>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
                cm.SetIsRootClass(true);
            })
            .AddBsonClassMap<CreateApplicationChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RenameApplicationChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RenameApplicationPartChange>(cm => cm.AutoMap())
            .AddBsonClassMap<AddComponentToApplicationPartChange>(cm => cm.AutoMap())
            .AddBsonClassMap<ChangeScopeOfComponentChange>(cm => cm.AutoMap())
            .AddBsonClassMap<AddPartToApplicationChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RemovePartFromApplicationChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RemoveComponentFromApplicationPartChange>(cm => cm.AutoMap())
            .AddBsonClassMap<ApplicationPartComponentValuesChange>(cm => cm.AutoMap())
            .AddBsonClassMap<CreateComponentChange>(cm => cm.AutoMap())
            .AddBsonClassMap<PublishedApplicationPartChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RemoveComponentChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RenameComponentChange>(cm => cm.AutoMap())
            .AddBsonClassMap<ComponentSchemaChange>(cm => cm.AutoMap())
            .AddBsonClassMap<ComponentValuesChange>(cm => cm.AutoMap())
            .AddBsonClassMap<CreateVariableChange>(cm => cm.AutoMap())
            .AddBsonClassMap<RenameVariableChange>(cm => cm.AutoMap())
            .AddBsonClassMap<DeleteVariableValueChange>(cm => cm.AutoMap())
            .AddBsonClassMap<VariableValueChange>(cm => cm.AutoMap())
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateMany(new CreateIndexModel<ChangeLog>[]
                {
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationId),
                        new CreateIndexOptions { Name = "ChangeLog-Change-ApplicationId" }),
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartId),
                        new CreateIndexOptions { Name = "ChangeLog-Change-PartId" }),
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentId),
                        new CreateIndexOptions { Name = "ChangeLog-Change-PartComponentId" }),
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.VariableId),
                        new CreateIndexOptions { Name = "ChangeLog-Change-VariableId" }),
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.ComponentId),
                        new CreateIndexOptions { Name = "ChangeLog-Change-ComponentId" }),
                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationVersion)),
                        new CreateIndexOptions
                        {
                            Name = "ChangeLog-Change-ApplicationIdAndVersion"
                        }),
                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartVersion)),
                        new CreateIndexOptions { Name = "ChangeLog-Change-PartIdAndVersion" }),
                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentVersion)),
                        new CreateIndexOptions
                        {
                            Name = "ChangeLog-Change-PartComponentIdAndVersion"
                        }),
                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.VariableId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.VariableVersion)),
                        new CreateIndexOptions { Name = "ChangeLog-Change-VariableIdAndVersion" }),
                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.ComponentId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.ComponentVersion)),
                        new CreateIndexOptions { Name = "ChangeLog-Change-ComponentIdAndVersion" })
                });
            });
    }
}
