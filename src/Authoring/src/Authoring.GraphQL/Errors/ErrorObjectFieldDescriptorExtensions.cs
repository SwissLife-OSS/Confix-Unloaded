using System;
using System.Collections.Generic;
using HotChocolate.Types;
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

            descriptor.Extend().OnBeforeCreate((c, d) =>
            {
                CreateError factory = ErrorFactoryCompiler.Compile(errorType);

                if (!d.ContextData.TryGetValue(ErrorContextData.Factories, out object? value) ||
                    !(value is List<(Type, CreateError)> errorFactories))
                {
                    errorFactories = new List<(Type, CreateError)>();
                    d.ContextData[ErrorContextData.Factories] = errorFactories;
                }

                errorFactories.Add((errorType, factory));

                d.Dependencies.Add(
                    new TypeDependency(
                        c.TypeInspector.GetTypeRef(errorType, TypeContext.Output)));
            });

            return descriptor;
        }
    }
}
