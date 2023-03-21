using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Confix.Authoring.Store.Mongo;

public static class FilterDefinitionBuilderExtensions
{
    public static FilterDefinition<TDocument> EqOrNull<TDocument, TField>(
        this FilterDefinitionBuilder<TDocument> builder,
        Expression<Func<TDocument, object?>> field,
        TField value)
    {
        if (value is null)
        {
            return builder.Type(field, BsonType.Null);
        }

        return builder.Eq(field, value);
    }

    public static FilterDefinition<TDocument> EqOrNull<TDocument, TField>(
        this FilterDefinitionBuilder<TDocument> builder,
        string field,
        TField value)
    {
        if (value is null)
        {
            return builder.Type(field, BsonType.Null);
        }

        return builder.Eq(field, value);
    }

    public static FilterDefinition<TDocument> Null<TDocument>(
        this FilterDefinitionBuilder<TDocument> builder,
        string field)
    {
        return builder.Type(field, BsonType.Null);
    }

    public static FilterDefinition<TDocument> Null<TDocument>(
        this FilterDefinitionBuilder<TDocument> builder,
        Expression<Func<TDocument, object?>> field)
    {
        return builder.Type(field, BsonType.Null);
    }
}
