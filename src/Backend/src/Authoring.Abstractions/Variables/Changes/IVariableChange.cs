using Confix.Authoring.Store;
using HotChocolate;

namespace Confix.Authoring.Variables.Changes;

public interface IVariableChange : IChange
{
    [GraphQLType(typeof(Variable))]
    [GraphQLName("variable")]
    Guid VariableId { get; }

    int VariableVersion { get; }
}
