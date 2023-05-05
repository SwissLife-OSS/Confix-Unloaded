using GreenDonut;

namespace Confix.Authoring.Publishing;

public interface IPublishedApplicationPartsByPartIdDataloader
    : IDataLoader<Guid, PublishedApplicationPart[]>
{
}
