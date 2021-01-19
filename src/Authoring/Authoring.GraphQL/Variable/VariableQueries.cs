using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Query")]
    public class VariableQueries
    {
        private readonly IVariableService _variableService;

        public VariableQueries(IVariableService variableService)
        {
            _variableService = variableService;
        }

        public async Task<IEnumerable<Variable>> GetVariablesAsync(
            CancellationToken cancellationToken)
        {
            return await _variableService.GetAllAsync(cancellationToken);
        }

        public async Task<Variable> GetVariableAsync(
            Guid id,
            CancellationToken cancellationToken)
        {
            return await _variableService.GetByIdAsync(id,cancellationToken);
        }
    }

    public class VariableType : ObjectType<Variable>
    {
        protected override void Configure(IObjectTypeDescriptor<Variable> descriptor)
        {
            descriptor.Field("values")
                .ResolveWith<VariableResolvers>(_ => _.GetVariableValuesAsync(default!, default!));
        }
    }

    public class VariableResolvers
    {
        private readonly IVariableService _variableService;

        public VariableResolvers(IVariableService variableService)
        {
            _variableService = variableService;
        }

        public Task<IEnumerable<VariableValue>> GetVariableValuesAsync(
            Variable variable,
            CancellationToken cancellationToken)
        {
            return _variableService.GetValuesAsync(
                variable,
                new GetVariableValuesRequest(
                    new VariableValueFilter(variable.Id)),
                cancellationToken);
        }
    }
}
