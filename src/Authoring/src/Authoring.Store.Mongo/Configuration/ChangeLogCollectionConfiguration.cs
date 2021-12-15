using MongoDB.Driver;
using MongoDB.Extensions.Context;
using static MongoDB.Driver.Builders<Confix.Authoring.Store.ChangeLog>;

namespace Confix.Authoring.Store.Mongo.Configuration;

internal class ChangeLogCollectionConfiguration : IMongoCollectionConfiguration<ChangeLog>
{
    public void OnConfiguring(IMongoCollectionBuilder<ChangeLog> builder)
    {
        builder
            .WithCollectionName("change_log")
            .AddBsonClassMap<ChangeLog>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id);
            })
            .AddBsonClassMap<CreateApplicationChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<RenameApplicationChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<RenameApplicationPartChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<AddComponentToApplicationPartChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<AddPartToApplicationChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<RemovePartFromApplicationChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<RemoveComponentFromApplicationPartChange>(cm =>
            {
                cm.AutoMap();
            })
            .AddBsonClassMap<ApplicationPartComponentValuesChange>(cm =>
            {
                cm.AutoMap();
            })
            .WithCollectionSettings(s => s.ReadConcern = ReadConcern.Majority)
            .WithCollectionSettings(s => s.ReadPreference = ReadPreference.Nearest)
            .WithCollectionConfiguration(collection =>
            {
                collection.Indexes.CreateMany(new CreateIndexModel<ChangeLog>[]
                {
                    new(IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationId),
                        new() { Name = "ChangeLog-Change-ApplicationId" }),

                    new(IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartId),
                        new() { Name = "ChangeLog-Change-PartId" }),

                    new(IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentId),
                        new() { Name = "ChangeLog-Change-PartComponentId" }),

                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationVersion)),
                        new() { Name = "ChangeLog-Change-ApplicationIdAndVersion" }),

                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.ApplicationPartVersion)),
                        new() { Name = "ChangeLog-Change-PartIdAndVersion" }),

                    new(IndexKeys.Combine(
                            IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentId),
                            IndexKeys.Ascending(WellKnownChangeLogFields.PartComponentVersion)),
                        new() { Name = "ChangeLog-Change-PartComponentIdAndVersion" })
                });
            });
    }
}

public static class WellKnownChangeLogFields
{
    public static string ApplicationId =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationChange.ApplicationId)}";

    public static string ApplicationPartId =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartChange.PartId)}";

    public static string PartComponentId =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartComponentChange.PartComponentId)}";

    public static string ApplicationVersion =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationChange.ApplicationVersion)}";

    public static string ApplicationPartVersion =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartChange.PartVersion)}";

    public static string PartComponentVersion =>
        $"{nameof(ChangeLog.Change)}.{nameof(IApplicationPartComponentChange.PartComponentVersion)}";
}
