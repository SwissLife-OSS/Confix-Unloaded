using System;
using System.Collections.Generic;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Descriptors.Definitions;

namespace Confix.Authoring.GraphQL
{
    public static class ErrorObjectFieldDescriptorExtensions
    {
        public static IObjectFieldDescriptor Throws<TError>(
            this IObjectFieldDescriptor descriptor) =>
            Throws(descriptor, typeof(TError));

        public static IObjectFieldDescriptor Throws(
            this IObjectFieldDescriptor descriptor,
            Type errorType)
        {
            // TODO : ensure that this is not a schema type

            descriptor.Extend().OnBeforeCreate(ConfigureField);

            return descriptor;

            void ConfigureField(IDescriptorContext c, ObjectFieldDefinition d)
            {
                ErrorDefinition definition = ErrorFactoryCompiler.Compile(errorType);

                if (!d.ContextData
                        .TryGetValue(ErrorContextData.ErrorDefinitions, out object? value) ||
                    !(value is List<ErrorDefinition> errorFactories))
                {
                    errorFactories = new List<ErrorDefinition>();
                    d.ContextData[ErrorContextData.ErrorDefinitions] = errorFactories;
                }

                errorFactories.Add(definition);

                ExtendedTypeReference typeRef = c.TypeInspector.GetTypeRef(definition.SchemaType);
                d.Dependencies.Add(new TypeDependency(typeRef));
            }
        }
    }
}
