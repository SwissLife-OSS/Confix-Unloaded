using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    public class ErrorInterfaceType : InterfaceType<IUserError>
    {
        protected override void Configure(IInterfaceTypeDescriptor<IUserError> descriptor)
        {
            descriptor.Name("UserError");
        }
    }
}
