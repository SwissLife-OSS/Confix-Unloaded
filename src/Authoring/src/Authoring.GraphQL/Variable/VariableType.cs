using System;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.DataLoaders;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    public class VariableType : ObjectType<Variable>
    {
        protected override void Configure(IObjectTypeDescriptor<Variable> descriptor)
        {
            descriptor
                .ImplementsNode()
                .ResolveNodeWith<Resolvers>(c => c.GetVariable(default!, default!, default));

            descriptor.Field("values")
                .ResolveWith<VariableResolvers>(_ => _.GetVariableValuesAsync(default!, default!));
        }

        private class Resolvers
        {
            public Task<Variable?> GetVariable(
                Guid id,
                VariableByIdDataLoader variableById,
                CancellationToken cancellationToken)
            {
                return variableById.LoadAsync(id, cancellationToken)!;
            }
        }

    }
}
