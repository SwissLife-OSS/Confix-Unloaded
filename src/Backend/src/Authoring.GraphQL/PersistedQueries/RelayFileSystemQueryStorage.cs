using System.Reflection;
using System.Text.Json;
using HotChocolate.Execution;
using HotChocolate.Language;

namespace Confix.Authoring.GraphQL;

internal sealed class RelayFileSystemQueryStorage : IReadStoredQueries
{
    private readonly Dictionary<string, QueryDocument> _lookup = new();

    public RelayFileSystemQueryStorage()
    {
        LoadQueries("Confix.Authoring.GraphQL.Persisted.UI");
        LoadQueries("Confix.Authoring.GraphQL.Persisted.Tooling");
    }

    private void LoadQueries(string resourceName)
    {
        Assembly assembly = typeof(RelayFileSystemQueryStorage).Assembly;
        using Stream? jsonStream = assembly.GetManifestResourceStream(resourceName);

        if (jsonStream is not null &&
            JsonSerializer.Deserialize<Dictionary<string, string>>(jsonStream) is { } queries)
        {
            foreach (var (key, query) in queries)
            {
                _lookup[key] = new QueryDocument(Utf8GraphQLParser.Parse(query));
            }
        }
    }

    /// <inheritdoc />
    public Task<QueryDocument?> TryReadQueryAsync(
        string queryId,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(queryId))
        {
            throw new ArgumentNullException(nameof(queryId));
        }

        return Task.FromResult(_lookup.GetValueOrDefault(queryId));
    }
}
