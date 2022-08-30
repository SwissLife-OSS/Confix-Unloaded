using Microsoft.AspNetCore.Http.Extensions;

namespace Confix.Vault.Client;

public static class QueryBuilderExtensions
{
    public static QueryBuilder AddParameter(this QueryBuilder builder, string name, string value)
    {
        builder.Add(name, value);
        return builder;
    }
}
