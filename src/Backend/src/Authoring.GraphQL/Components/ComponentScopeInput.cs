using Confix.Authoring.Store;

namespace Confix.Authoring.GraphQL.Components;

public sealed record ComponentScopeInput(
    string Namespace,
    [property: ID<Application>] Guid? ApplicationId,
    [property: ID<ApplicationPart>] Guid? ApplicationPartId)
{
    public ComponentScope ToScope() => new(Namespace, ApplicationId, ApplicationPartId);
}
