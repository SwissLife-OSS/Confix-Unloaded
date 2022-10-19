using System.Collections.Immutable;
using MongoDB.Bson.Serialization.Serializers;

namespace Confix.Authoring.Store.Mongo;

internal sealed class ImmutableHashSetSerializer<TValue>
    : EnumerableInterfaceImplementerSerializerBase<ImmutableHashSet<TValue>, TValue>
{
    protected override object CreateAccumulator()
    {
        return ImmutableHashSet.CreateBuilder<TValue>();
    }

    protected override ImmutableHashSet<TValue> FinalizeResult(object accumulator)
    {
        return ((ImmutableHashSet<TValue>.Builder)accumulator).ToImmutable();
    }
}
