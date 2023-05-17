using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.GraphQL.Tests;

public class SchemaTests
{
    [Fact]
    public async Task PrintSchema()
    {
        var schema = await new ServiceCollection()
            .AddGraphQLServer()
            .AddConfixSchema()
            .BuildSchemaAsync();

        schema.Print().MatchSnapshot();
    }
}
