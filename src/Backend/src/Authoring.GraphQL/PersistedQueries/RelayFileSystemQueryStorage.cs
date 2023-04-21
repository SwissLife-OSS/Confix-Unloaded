using System.Text.Json;
using HotChocolate.Execution;
using HotChocolate.Language;

namespace Confix.Authoring.GraphQL;

internal sealed class RelayFileSystemQueryStorage
 : IReadStoredQueries
{
    private const string _file = "persisted/queries.json";
    private readonly Dictionary<string, QueryDocument> _lookup = new();

    /// <summary>
       /// Initializes a new instance of the class.
       /// </summary>
    public RelayFileSystemQueryStorage()
    {
        var assembly = typeof(RelayFileSystemQueryStorage).Assembly;
        using var s = assembly.GetManifestResourceStream(assembly.GetManifestResourceNames()[0])!;

        if (File.Exists(_file) &&
            JsonSerializer.Deserialize<Dictionary<string, string>>(s) is { } queries)
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
