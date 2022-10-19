using System;
using System.Collections.Generic;
using System.Linq;

namespace Confix.Authoring.Extensions;

internal static class CollectionExtensions
{
    public static ICollection<T> Replace<T>(this ICollection<T> collection, T item, Func<T> factory)
        where T : class =>
        collection.Select(x => item == x ? factory() : x).ToArray();
}
