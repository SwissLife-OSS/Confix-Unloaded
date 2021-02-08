using System;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace Confix.Authoring.GraphQL
{
    public class ThrowsAttribute : ObjectFieldDescriptorAttribute
    {
        public ThrowsAttribute(Type errorType)
        {
            ErrorType = errorType;
        }

        public Type ErrorType { get; }

        public override void OnConfigure(
            IDescriptorContext context,
            IObjectFieldDescriptor descriptor,
            MemberInfo member)
        {
            descriptor.Throws(ErrorType);
        }
    }
}
