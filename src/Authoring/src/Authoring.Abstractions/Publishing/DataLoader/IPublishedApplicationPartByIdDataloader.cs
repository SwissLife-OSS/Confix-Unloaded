using System;
using GreenDonut;

namespace Confix.Authoring.Publishing;

public interface IPublishedApplicationPartsByPartIdDataloader
    : IDataLoader<Guid, PublishedApplicationPart[]?>
{
}

public interface IPublishedApplicationPartByIdDataloader
    : IDataLoader<Guid, PublishedApplicationPart?>
{
}
