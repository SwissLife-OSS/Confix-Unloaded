using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(ApplicationPart))]
public class ApplicationPartNode
{
    [NodeResolver]
    public static Task<ApplicationPart?> GetApplicationPartAsync(
        Guid id,
        IApplicationPartDataLoader applicationPartById,
        CancellationToken cancellationToken) =>
        applicationPartById.LoadAsync(id, cancellationToken);
}
