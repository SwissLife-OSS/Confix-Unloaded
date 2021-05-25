using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Internal;
using Confix.Authoring.Store;
using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL.Applications
{
    [ExtendObjectType(typeof(ApplicationPartComponent))]
    public class ApplicationPartComponentNode
    {
        [BindMember(nameof(ApplicationPartComponent.ComponentId))]
        public async Task<Component> GetDefinitionAsync(
            [Parent] ApplicationPartComponent applicationPartComponent,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken) =>
            (await componentById.LoadAsync(
                applicationPartComponent.ComponentId,
                cancellationToken))!;


        [GraphQLType(typeof(AnyType))]
        [BindMember(nameof(Component.Values))]
        public async Task<Dictionary<string, object?>?> GetValuesAsJson(
            [Parent] ApplicationPartComponent applicationPartComponent,
            [Service] IComponentService componentService,
            CancellationToken cancellationToken)
        {
            if (applicationPartComponent.Values is null)
            {
                return null;
            }

            ISchema? schema = await componentService.GetSchemaByIdAsync(
                applicationPartComponent.ComponentId,
                cancellationToken);

            if (schema is null)
            {
                return null;
            }

            var document = JsonDocument.Parse(applicationPartComponent.Values!);
            return ValueHelper.DeserializeDictionary(document.RootElement, schema.QueryType);
        }
    }
}
