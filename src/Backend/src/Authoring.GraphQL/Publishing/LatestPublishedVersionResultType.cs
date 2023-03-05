using Confix.Authoring.Publishing;

namespace Confix.Authoring.GraphQL.Publishing;

public sealed class LatestPublishedVersionResultType : UnionType
{
    protected override void Configure(IUnionTypeDescriptor descriptor)
    {
        descriptor.Name("LatestPublishedVersionResult");

        descriptor
            .Type<ObjectType<LatestPublishedVersion>>()
            .Type<ObjectType<ClaimVersionFailedException>>();
    }
}
