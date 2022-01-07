using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.GraphQL.Applications;

[Node]
[ExtendObjectType(typeof(ChangeLogNode))]
public class ChangeLogNode
{
    [NodeResolver]
    public static Task<ChangeLog?> GetApplicationAsync(
        Guid id,
        ChangeLogByIdDataloader applicationById,
        CancellationToken cancellationToken) =>
        applicationById.LoadAsync(id, cancellationToken);
}
