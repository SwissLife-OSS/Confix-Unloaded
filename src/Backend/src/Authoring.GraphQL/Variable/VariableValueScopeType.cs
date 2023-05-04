namespace Confix.Authoring.GraphQL;

public class VariableValueScopeType : UnionType<VariableValueScope>
{
    protected override void Configure(IUnionTypeDescriptor descriptor)
    {
        descriptor.Name(nameof(VariableValueScope));

        // The object types that belong to this union
        descriptor.Type<ObjectType<ApplicationPartVariableValueScope>>();
        descriptor.Type<ObjectType<ApplicationVariableValueScope>>();
        descriptor.Type<ObjectType<NamespaceVariableValueScope>>();
    }
}
