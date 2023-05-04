using Confix.Authoring.DataLoaders;
using Confix.Authoring.Store;
using Confix.Authoring.Variables.Changes;
using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL;

public static class VariablesRequestExecutorBuilderExtensions
{
    public static IRequestExecutorBuilder AddVariables(this IRequestExecutorBuilder builder)
    {
        // dataloaders
        builder
            .AddDataLoader<IVariableDataLoader, VariableByIdDataLoader>()
            .AddDataLoader<ChangeLogByVariableIdDataloader>()
            .AddDataLoader<VariableByIdDataLoader>();

        // nodes
        builder.AddTypeExtension<VariableNode>();

        // types
        builder
            .AddTypeExtension<VariableQueries>()
            .AddTypeExtension<VariableMutations>();

        // extensions
        builder
            .AddTypeExtension<VariableValueExtensions>()
            .AddTypeExtension<VariableExtensions>();

        // change log
        builder
            .AddInterfaceType<IVariableChange>(x => x.Name("VariableChange"))
            .AddType<CreateVariableChange>()
            .AddType<RenameVariableChange>()
            .AddType<DeleteVariableValueChange>()
            .AddType<VariableValueChange>();

        // Variable scope
        builder
            .AddInputObjectType<VariableValueScopeInput>()
            .AddInputObjectType<ApplicationPartVariableValueScope>()
            .AddInputObjectType<ApplicationVariableValueScope>()
            .AddInputObjectType<NamespaceVariableValueScope>()

            .AddType<VariableValueScopeType>();

        return builder;
    }

    public class VariableValueScopeType : UnionType<VariableValueScope>
    {
        protected override void Configure(IUnionTypeDescriptor descriptor)
        {
            descriptor.Name("VariableValueScope");

            // The object types that belong to this union
            descriptor.Type<ObjectType<ApplicationPartVariableValueScope>>();
            descriptor.Type<ObjectType<ApplicationVariableValueScope>>();
            descriptor.Type<ObjectType<NamespaceVariableValueScope>>();
        }
    }
}
