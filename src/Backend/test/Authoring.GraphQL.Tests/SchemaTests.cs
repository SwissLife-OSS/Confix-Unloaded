using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using Snapshooter.Xunit;
using Xunit;

namespace Confix.Authoring.GraphQL;

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
