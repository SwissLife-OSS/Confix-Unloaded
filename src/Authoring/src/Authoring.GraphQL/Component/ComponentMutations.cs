using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Configuration;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Descriptors.Definitions;
using HotChocolate.Utilities;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(RootTypes.Mutation)]
    public class ComponentMutations
    {
        private readonly IComponentService _componentService;

        public ComponentMutations(IComponentService componentService)
        {
            _componentService = componentService;
        }

        public async Task<UpdateComponentPayload> CreateComponentAsync(
            AddComponentRequest input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.AddAsync(
                input,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }

        public async Task<UpdateComponentPayload> UpdateComponentSchemaAsync(
            UpdateComponentSchemaRequest input,
            CancellationToken cancellationToken)
        {
            Component component = await _componentService.UpdateSchemaAsync(
                input,
                cancellationToken);

            return new UpdateComponentPayload(component);
        }
    }

    public record CreateComponentInput(
        string Name,
        string Schema = "type ComponentRoot { text: String! }");

    public class CreateComponentPayload
    {
        public Component Component { get; }
    }

    public class ComponentNameTaken
        : IUserError
        , ICreateComponentError
    {
        public ComponentNameTaken(string componentName)
        {
            ComponentName = componentName;
        }

        public string Code => GetType().Name;

        public string Message => "The component name is already used by a different component.";

        public string ComponentName { get; }

        public static ComponentNameTaken? CreateErrorFrom(Exception exception)
        {
            throw new Exception();
        }
    }

    [UnionType("CreateComponentError")]
    public interface ICreateComponentError { }

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

    public static class ErrorObjectFieldDescriptorExtensions
    {
        private const string _factories = "SwissLife.ErrorFactories";

        public static IObjectFieldDescriptor Throws<TError>(
            this IObjectFieldDescriptor descriptor) =>
            Throws(descriptor, typeof(TError));

        public static IObjectFieldDescriptor Throws(
            this IObjectFieldDescriptor descriptor,
            Type errorType)
        {
            descriptor.Extend().OnBeforeCreate((c, d) =>
            {
                CreateError factory = ErrorFactoryCompiler.Compile(errorType);

                if (!d.ContextData.TryGetValue(_factories, out object? value) ||
                    !(value is List<(Type, CreateError)> errorFactories))
                {
                    errorFactories = new List<(Type, CreateError)>();
                    d.ContextData[_factories] = errorFactories;
                }

                errorFactories.Add((errorType, factory));

                d.Dependencies.Add(
                    new TypeDependency(
                        c.TypeInspector.GetTypeRef(errorType, TypeContext.Output)));
            });

            return descriptor;
        }
    }

    internal class MutationErrorTypeInterceptor : TypeInterceptor
    {
        private readonly StringBuilder _stringBuilder = new();

        public override void OnAfterRegisterDependencies(
            ITypeDiscoveryContext discoveryContext,
            DefinitionBase? definition,
            IDictionary<string, object?> contextData)
        {
            if (definition is ObjectTypeDefinition objectTypeDefinition)
            {
                foreach (var field in objectTypeDefinition.Fields)
                {
                    _stringBuilder.Clear();
                    _stringBuilder.Append(char.ToUpperInvariant(field.Name.Value[0]));
                    _stringBuilder.Append(field.Name.Value.Substring(1));
                    _stringBuilder.Append("Error");

                    var errorUnion = new UnionType(d => d.Name(_stringBuilder.ToString()));

                }
            }
        }

        public override void OnAfterInitialize(
            ITypeDiscoveryContext discoveryContext,
            DefinitionBase? definition,
            IDictionary<string, object?> contextData)
        {

        }
    }

    internal class ErrorMiddleware
    {
        private readonly FieldDelegate _next;
        private readonly IReadOnlyList<CreateError> _errorHandlers;

        public ErrorMiddleware(FieldDelegate next, IReadOnlyList<CreateError> errorHandlers)
        {
            _next = next ??
                throw new ArgumentNullException(nameof(next));
            _errorHandlers = errorHandlers ??
                throw new ArgumentNullException(nameof(errorHandlers));
        }

        public async ValueTask InvokeAsync(IMiddlewareContext context)
        {
            try
            {
                await _next(context).ConfigureAwait(false);
            }
            catch (GraphQLException)
            {
                throw;
            }
            catch (AggregateException ex)
            {
                var errors = new List<object>();

                foreach (var exception in ex.InnerExceptions)
                {
                    foreach (CreateError createError in _errorHandlers)
                    {
                        if (createError(exception) is { } error)
                        {
                            errors.Add(error);
                            break;
                        }
                    }
                }

                if (errors.Count == 0)
                {
                    throw;
                }

                context.SetScopedValue("errors", errors);
                context.Result = new object();
            }
            catch (Exception ex)
            {
                object? error = null;

                foreach (CreateError createError in _errorHandlers)
                {
                    if (createError(ex) is { } e)
                    {
                        error = e;
                        break;
                    }
                }

                if (error is null)
                {
                    throw;
                }

                context.SetScopedValue("errors", new[] { error });
                context.Result = new object();
            }
        }
    }

    internal static class ErrorFactoryCompiler
    {
        public static CreateError Compile(Type errorType)
        {
            if (errorType is null)
            {
                throw new ArgumentNullException(nameof(errorType));
            }

            if (TryCreateDefaultErrorFactory(errorType, out CreateError? factory))
            {
                return factory;
            }

            if (TryCreateFactoryFromConstructor(errorType, out factory))
            {
                return factory;
            }

            throw new SchemaException(
                SchemaErrorBuilder.New()
                    .SetMessage(
                        "The error type {0} does not expose any error factory.",
                        errorType.FullName ?? errorType.Name)
                    .Build());
        }

        private static bool TryCreateDefaultErrorFactory(
            Type errorType,
            [NotNullWhen(true)] out CreateError? factory)
        {
            MethodInfo? method = errorType.GetMethod(
                "TryCreateErrorFrom",
                BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);

            if (method is not null && method.ReturnType == typeof(object))
            {
                ParameterInfo[] parameters = method.GetParameters();
                if (parameters.Length == 1 &&
                    parameters[0].ParameterType == typeof(Exception))
                {
                    ParameterExpression exception = Expression.Parameter(typeof(Exception), "ex");
                    Expression factoryExpression = Expression.Call(method, exception);
                    factory = Expression.Lambda<CreateError>(factoryExpression, exception).Compile();
                    return true;
                }
            }

            factory = null;
            return false;
        }

        private static bool TryCreateFactoryFromConstructor(
            Type errorType,
            [NotNullWhen(true)] out CreateError? factory)
        {
            MethodInfo getTypeMethod = typeof(Expression)
                .GetMethods()
                .Single(t => t.Name.EqualsOrdinal("GetType") && t.GetParameters().Length == 0);

            ParameterExpression exception = Expression.Parameter(typeof(Exception), "ex");
            Expression nullValue = Expression.Constant(null, typeof(object));
            Expression? previous = null;

            foreach (var constructor in errorType.GetConstructors(
                BindingFlags.Public | BindingFlags.NonPublic))
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
                        previous = Expression.IfThenElse(test, createError, nullValue);
                    }
                    else
                    {
                        previous = Expression.IfThenElse(test, createError, previous);
                    }
                }
            }

            if (previous is not null)
            {
                factory = Expression.Lambda<CreateError>(previous, exception).Compile();
                return true;
            }

            factory = null;
            return false;
        }
}

    internal delegate object? CreateError(Exception exception);


}
