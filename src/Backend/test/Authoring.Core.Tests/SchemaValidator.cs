using Squadron;
using Xunit;
using Microsoft.Extensions.Caching.Memory;
using  Confix.Authoring.Internal;

namespace Confix.Authoring.Core.Tests;

public class SchemaValidatorTests
{
    [Theory]
    [InlineData(
        """
        type Component {
            someText: String!
            someNumber: Int!
            someDouble: Double!
            someBoolean: Boolean!
        }
        """)]
    public void ValidateSchema_ValidSchemas_NoException(string schema)
    {
        // Arrange
        SchemaValidator validator = new(Mock.Of<IMemoryCache>());

        // Act && Assert
        validator.ValidateSchema(schema);
    }


}
