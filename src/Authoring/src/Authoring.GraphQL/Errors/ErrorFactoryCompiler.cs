using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Utilities;

namespace Confix.Authoring.GraphQL
{
    internal static class ErrorFactoryCompiler
    {
        public static ErrorDefinition Compile(Type errorType)
        {
            if (errorType is null)
            {
                throw new ArgumentNullException(nameof(errorType));
            }

            if (TryCreateDefaultErrorFactory(errorType, out ErrorDefinition? definition))
            {
                return definition;
            }

            if (TryCreateFactoryFromConstructor(errorType, out definition))
            {
                return definition;
            }

            if (TryCreateFactoryFromException(errorType, out definition))
            {
                return definition;
            }

            throw new SchemaException(
                SchemaErrorBuilder
                    .New()
                    .SetMessage(
                        "The error type {0} does not expose any error factory.",
                        errorType.FullName ?? errorType.Name)
                    .Build());
        }

        private static bool TryCreateFactoryFromException(
            Type errorType,
            [NotNullWhen(true)] out ErrorDefinition? definition)
        {
            if (errorType.IsAssignableTo(typeof(Exception)))
            {
                Type schemaType = typeof(ExceptionObjectType<>).MakeGenericType(errorType);
                definition = new ErrorDefinition(
                    errorType,
                    schemaType,
                    ex => ex.GetType() == errorType ? ex : null);
                return true;
            }

            definition = null;
            return false;
        }

        private static bool TryCreateDefaultErrorFactory(
            Type errorType,
            [NotNullWhen(true)] out ErrorDefinition? definition)
        {
            MethodInfo? method = errorType.GetMethod(
                "CreateErrorFrom",
                BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);

            if (method is not null &&
                (method.ReturnType == typeof(object) ||
                    method.ReturnType == errorType))
            {
                ParameterInfo[] parameters = method.GetParameters();
                if (parameters.Length == 1 &&
                    parameters[0].ParameterType == typeof(Exception))
                {
                    ParameterExpression exception = Expression.Parameter(typeof(Exception), "ex");
                    Expression factoryExpression = Expression.Call(method, exception);
                    CreateError factory = Expression.Lambda<CreateError>(
                            Expression.Convert(factoryExpression, typeof(object)),
                            exception)
                        .Compile();

                    Type schemaType = typeof(ObjectType<>).MakeGenericType(errorType);
                    definition = new ErrorDefinition(errorType, schemaType, factory);
                    return true;
                }
            }

            definition = null;
            return false;
        }

        private static bool TryCreateFactoryFromConstructor(
            Type errorType,
            [NotNullWhen(true)] out ErrorDefinition? definition)
        {
            MethodInfo getTypeMethod = typeof(Expression)
                .GetMethods()
                .Single(t =>
                    StringExtensions.EqualsOrdinal(t.Name, "GetType") &&
                    t.GetParameters().Length == 0);

            ParameterExpression exception = Expression.Parameter(typeof(Exception), "ex");
            Expression nullValue = Expression.Constant(null, typeof(object));
            ParameterExpression variable = Expression.Variable(typeof(object), "obj");
            Expression? previous = null;

            foreach (var constructor in errorType.GetConstructors(
                BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance))
            {
                ParameterInfo[] parameters = constructor.GetParameters();
                if (parameters.Length == 1 &&
                    typeof(Exception).IsAssignableFrom(parameters[0].ParameterType))
                {
                    Type expectedException = parameters[0].ParameterType;

                    Expression expected = Expression.Constant(expectedException, typeof(Type));
                    Expression actual = Expression.Call(exception, getTypeMethod);
                    Expression test = Expression.Equal(expected, actual);

                    Expression castedException = Expression.Convert(exception, expectedException);
                    Expression createError = Expression.New(constructor, castedException);

                    if (previous is null)
                    {
                        previous = Expression.IfThenElse(
                            test,
                            Expression.Assign(variable, createError),
                            Expression.Assign(variable, nullValue));
                    }
                    else
                    {
                        previous = Expression.IfThenElse(
                            test,
                            Expression.Assign(variable, createError),
                            Expression.Assign(variable, previous));
                    }
                }
            }

            if (previous is not null)
            {
                var factory = Expression.Lambda<CreateError>(
                        Expression.Block(
                            new[]
                            {
                                variable
                            },
                            new List<Expression> { previous, variable }),
                        exception)
                    .Compile();
                Type schemaType = typeof(ObjectType<>).MakeGenericType(errorType);
                definition = new ErrorDefinition(errorType, schemaType, factory);
                return true;
            }

            definition = null;
            return false;
        }
    }

    internal delegate object? CreateError(Exception exception);
}
