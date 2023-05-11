namespace Confix.Authoring.GraphQL.Components;

public class ComponentScopeType : UnionType<ComponentScope>
{
    protected override void Configure(IUnionTypeDescriptor descriptor)
    {
        descriptor.Name(nameof(ComponentScope));

        // The object types that belong to this union
        descriptor.Type<ObjectType<ApplicationPartComponentScope>>();
        descriptor.Type<ObjectType<ApplicationComponentScope>>();
        descriptor.Type<ObjectType<NamespaceComponentScope>>();
    }
}
