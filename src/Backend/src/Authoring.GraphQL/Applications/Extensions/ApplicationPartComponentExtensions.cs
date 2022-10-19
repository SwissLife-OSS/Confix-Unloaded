using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications;

[ExtendObjectType(typeof(ApplicationPartComponent))]
public sealed class ApplicationPartComponentExtensions
{
    public async Task<ApplicationPart?> GetApplicationPartAsync(
        [Service] IApplicationStore store,
        [Parent] ApplicationPartComponent partComponent,
        CancellationToken cancellationToken)
    {
        Application? application =
            await store.GetByComponentPartIdAsync(partComponent.Id, cancellationToken);
        return application?.Parts
            .FirstOrDefault(x => x.Components.Any(y => y.Id == partComponent.Id));
    }

    [BindMember(nameof(ApplicationPartComponent.Values))]
    public async ValueTask<string?> GetValuesAsync(
        [Service] IChangeLogService changeLogService,
        [Parent] ApplicationPartComponent parent,
        int? version,
        CancellationToken cancellationToken)
    {
        if (version is null || version == parent.Version)
        {
            return parent.Values;
        }

        ChangeLog? changelog = await changeLogService
            .GetByApplicationPartComponentIdAndVersion(parent.Id, version.Value, cancellationToken);

        return changelog switch
        {
            { Change: ApplicationPartComponentValuesChange { Values: { } v } } => v,
            { Change: AddComponentToApplicationPartChange { AddedComponent: { } c } } => c.Values,
            _ => ""
        };
    }
}
