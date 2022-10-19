using HotChocolate.Resolvers;

namespace Confix.Authoring;

[ExtendObjectType(typeof(Environment))]
public sealed class EnvironmentExtensions
{
    [BindMember(nameof(Environment.ParentId))]
    public async Task<Environment?> GetParentAsync(
        IResolverContext context,
        [Parent] Environment environment,
        [Service] IEnvironmentService service)
    {
        if (environment.ParentId is { } parentId)
        {
            return await service.GetByIdAsync(parentId);
        }

        return null;
    }
}
