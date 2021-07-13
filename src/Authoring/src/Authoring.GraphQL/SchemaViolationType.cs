using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    public class SchemaViolationType : ObjectType<SchemaViolation>
    {
        protected override void Configure(IObjectTypeDescriptor<SchemaViolation> descriptor)
        {
            descriptor.Field(t => t.Path).Type<NonNullType<AnyType>>();
        }
    }
}
