using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring;

[OneOf]
public record VariableValueScopeInput
{
    public ApplicationVariableValueScope? Application { get; init; }

    public ApplicationPartVariableValueScope? ApplicationPart { get; init; }

    public NamespaceVariableValueScope? Namespace { get; init; }

    public VariableValueScope GetValueScope()
        => Application as VariableValueScope ??
            ApplicationPart as VariableValueScope ??
            Namespace as VariableValueScope ??
            throw new GraphQLException("Invalid filter");
}
