using System.Collections.Immutable;
using MongoDB.Bson.Serialization.Serializers;

namespace Confix.Authoring.Store.Mongo;

public class ImmutableHashSetSerializer<TValue>
    : EnumerableInterfaceImplementerSerializerBase<ImmutableHashSet<TValue>, TValue>
{
    protected override object CreateAccumulator() =>
        ImmutableHashSet.CreateBuilder<TValue>();

    protected override ImmutableHashSet<TValue> FinalizeResult(object accumulator) =>
        ((ImmutableHashSet<TValue>.Builder)accumulator).ToImmutable();
}
