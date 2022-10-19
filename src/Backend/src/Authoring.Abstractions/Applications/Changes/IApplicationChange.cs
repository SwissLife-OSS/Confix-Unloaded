using HotChocolate;

namespace Confix.Authoring.Store;

public interface IApplicationChange : IChange
{
    [GraphQLType(typeof(Application))]
    [GraphQLName("application")]
    Guid ApplicationId { get; }

    int ApplicationVersion { get; }
}
