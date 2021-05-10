using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HotChocolate.Configuration;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Descriptors.Definitions;

namespace Confix.Authoring.GraphQL
{
    internal class MutationErrorTypeInterceptor : TypeInterceptor
    {
        private readonly List<(ITypeReference, UnionType)> _needsErrorField = new();
        private readonly HashSet<ObjectType> _objectTypes = new();
        private readonly List<(ITypeCompletionContext, ObjectTypeDefinition)> _contexts = new();

        public override void OnAfterRegisterDependencies(
            ITypeDiscoveryContext discoveryContext,
            DefinitionBase? definition,
            IDictionary<string, object?> contextData)
        {
            if (discoveryContext.Type is ObjectType objectType)
            {
                _objectTypes.Add(objectType);
            }

            if (definition is ObjectTypeDefinition objectTypeDefinition)
            {
                foreach (var field in objectTypeDefinition.Fields)
                {
                    if (!field.IsIntrospectionField &&
                        field.ContextData.TryGetValue(ErrorContextData.Factories, out var value) &&
                        value is List<(Type, CreateError)> factories)
                    {
                        StringBuilder stringBuilder = new();
                        stringBuilder.Append(char.ToUpperInvariant(field.Name.Value[0]));
                        stringBuilder.Append(field.Name.Value.Substring(1));
                        stringBuilder.Append("Error");

                        var errorUnion = new UnionType(d =>
                        {
                            d.Name(stringBuilder.ToString());

                            d.Extend().OnBeforeCreate(unionDef =>
                            {
                                foreach ((Type type, _) in factories)
                                {
                                    ExtendedTypeReference typeRef =
                                        discoveryContext.TypeInspector.GetTypeRef(
                                            typeof(ObjectType<>).MakeGenericType(type));
                                    unionDef.Types.Add(typeRef);
                                }
                            });
                        });

                        _needsErrorField.Add((field.Type, errorUnion));

                        FieldMiddleware middleware =
                            FieldClassMiddlewareFactory.Create<ErrorMiddleware>(
                                (typeof(IReadOnlyList<CreateError>), 
                                factories.Select(t => t.Item2).ToArray()));
                        field.MiddlewareComponents.Insert(0, middleware);

                        discoveryContext.RegisterDependency(
                            new TypeDependency(new SchemaTypeReference(errorUnion)));

                        field.ContextData.Remove(ErrorContextData.Factories);
                    }
                }
            }
        }

        public override void OnAfterCompleteName(
            ITypeCompletionContext completionContext,
            DefinitionBase? definition,
            IDictionary<string, object?> contextData)
        {
            if (completionContext.Type is ObjectType objectType &&
                definition is ObjectTypeDefinition objectTypeDef &&
                _objectTypes.Contains(objectType))
            {
                _contexts.Add((completionContext, objectTypeDef));
            }
        }

        public override void OnAfterCompleteTypeNames()
        {
            ITypeCompletionContext firstContext = _contexts.First().Item1;

            foreach ((ITypeReference typeRef, UnionType unionType) in _needsErrorField)
            {
                if (firstContext.TryGetType<IType>(typeRef, out var type) &&
                    type.NamedType() is ObjectType objectType &&
                    _contexts.FirstOrDefault(t => t.Item1.Type == objectType) is
                    {
                        Item1: { } context,
                        Item2: { } objectTypeDef
                    })
                {
                    var descriptor = ObjectFieldDescriptor.New(context.DescriptorContext, "errors");

                    descriptor
                        .Type(new ListType(new NonNullType(unionType)))
                        .Resolve(ctx =>
                        {
                            if (ctx.ScopedContextData.TryGetValue(ErrorContextData.Errors, out var o))
                            {
                                return o;
                            }

                            return null;
                        });

                    objectTypeDef.Fields.Add(descriptor.CreateDefinition());
                }
            }
        }
    }
}
