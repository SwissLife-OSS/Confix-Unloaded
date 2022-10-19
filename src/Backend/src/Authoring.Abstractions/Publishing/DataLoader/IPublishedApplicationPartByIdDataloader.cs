using GreenDonut;

namespace Confix.Authoring.Publishing;

public interface IPublishedApplicationPartByIdDataloader
    : IDataLoader<Guid, PublishedApplicationPart?>
{
}
