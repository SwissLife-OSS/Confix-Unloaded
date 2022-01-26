using System;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public interface IPublishedApplicationPartByPartIdDataloader
    : IDataLoader<Guid, PublishedApplicationPart[]?>
{
}
