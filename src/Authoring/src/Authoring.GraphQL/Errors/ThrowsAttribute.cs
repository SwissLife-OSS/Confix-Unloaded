using System;
using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace Confix.Authoring.GraphQL
{
    public class ErrorAttribute : ObjectFieldDescriptorAttribute
    {
        public ErrorAttribute(Type errorType)
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
