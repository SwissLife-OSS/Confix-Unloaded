namespace Confix.Authoring.GraphQL.Components;

[OneOf]
public record ComponentScopeInput
{
    public ApplicationComponentScope? Application { get; init; }

    public ApplicationPartComponentScope? ApplicationPart { get; init; }

    public NamespaceComponentScope? Namespace { get; init; }

    public ComponentScope GetScope()
        => Application as ComponentScope ??
            ApplicationPart as ComponentScope ??
            Namespace as ComponentScope ??
            throw new GraphQLException("Invalid filter");
}
