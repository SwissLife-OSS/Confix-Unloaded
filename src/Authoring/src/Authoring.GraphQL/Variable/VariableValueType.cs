using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    public class VariableValueType : ObjectType<VariableValue>
    {
        protected override void Configure(IObjectTypeDescriptor<VariableValue> descriptor)
        {
            descriptor.Field("variable")
                .ResolveWith<VariableResolvers>(_ => _.GetVariableAsync(default!, default!, default!));

            descriptor.Field("application")
                .ResolveWith<VariableResolvers>(_ => _.GetApplicationAsync(default!, default!, default!));

            descriptor.Field("part")
                .ResolveWith<VariableResolvers>(_ => _.GetApplicationPartAsync(default!, default!, default!));
        }
    }
}
