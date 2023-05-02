using HotChocolate;
using HotChocolate.Types;

namespace Confix.Authoring;

// TODO add to schema
[OneOf]
public record VariableReferenceInput
{
    public ApplicationVariableValueScope? Application { get; init; }

    public ApplicationPartVariableValueScope? ApplicationPart { get; init; }

    public NamespaceVariableValueScope? Namespace { get; init; }

    public VariableValueScope GetReference()
        => Application as VariableValueScope ??
            ApplicationPart as VariableValueScope ??
            Namespace as VariableValueScope ??
            throw new GraphQLException("Invalid filter");
}
