using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    public class VariableType : ObjectType<Variable>
    {
        protected override void Configure(IObjectTypeDescriptor<Variable> descriptor)
        {
            descriptor.Field("values")
                .ResolveWith<VariableResolvers>(_ => _.GetVariableValuesAsync(default!, default!));

        }
    }
}
