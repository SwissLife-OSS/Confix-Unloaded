using Microsoft.Extensions.Caching.Memory;
using Confix.Authoring.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Core.Tests;

public class SchemaValidatorTests
{
    #region ValidateSchema
    [Fact]
    public void ValidateSchema_Primitives_Valid()
        => AssertValidSchema("""
            type Configuration {
                someText: String!
                someNumber: Int!
                someFloat: Float!
                someLong: Long!
                someBoolean: Boolean!
            }
        """);

    [Fact]
    public void ValidateSchema_Enums_Valid()
        => AssertValidSchema("""
            type Configuration {
                someText: String!
                someEnum: ConfigurationEnum!
            }

            enum ConfigurationEnum {
                OPTION_1
                OPTION_2
                OPTION_3
            }
            """);

    [Fact]
    public void ValidateSchema_Arrays_Valid()
    => AssertValidSchema("""
        type Configuration {
            someText: String!
            someNumbers: [Int!]!
            someStrings: [String]!
            someCustom: [Custom!]
            someCustom2: [Custom]!
            someCustom3: [Custom!]!
        }

        type Custom {
            unicornCount: Int!
        }
        """);

    [Fact]
    public void ValidateSchema_Unions_Valid()
        => AssertValidSchema("""
            type Configuration {
                someField: CustomTypeUnion!
            }

            union CustomTypeUnion = CustomType1 | CustomType2

            type CustomType1 {
                field1: String!
            }

            type CustomType2 {
                field2: Int!
            }
            """);

    [Fact]
    public void ValidateSchema_Nested_Valid()
        => AssertValidSchema("""
            type Configuration {
                someText: String!
                level1: Level1!
            }

            type Level1 {
                field1: String!
                level2: Level2!
            }

            type Level2 {
                field2: String!
                level3: Level3!
            }

            type Level3 {
                field3: String!
            }
        """);

    [Fact]
    public void ValidateSchema_WithComments_Valid()
        => AssertValidSchema("""
            type Configuration {
                # some comment to make it clear
                someText: String!
            }
        """);

    [Fact]
    public void ValidateSchema_NoRootType_Exception()
        => AssertInvalidSchema("""
            type Unicorn {
                someText: String!
            }
        """);

    [Fact]
    public void ValidateSchema_MissingBrace_Exception()
        => AssertInvalidSchema("""
            type Configuration {
                someText: String!
        """);

    [Fact]
    public void ValidateSchema_UnknownType_Exception()
        => AssertInvalidSchema("""
            type Configuration {
                someText: Unicorn!
            }
        """);

    private void AssertValidSchema(string schema)
        => new SchemaValidator(GetMemoryCache()).ValidateSchema(schema);

    private void AssertInvalidSchema(string schema)
    {
        // arrange
        SchemaValidator validator = new(GetMemoryCache());

        // act && assert
        var exception = Assert.Throws<InvalidSchemaException>(() => validator.ValidateSchema(schema));
        exception.Errors.MatchSnapshot();
    }

    #endregion

    private IMemoryCache GetMemoryCache()
    {
        var services = new ServiceCollection();
        services.AddMemoryCache();
        var serviceProvider = services.BuildServiceProvider();

        return serviceProvider.GetRequiredService<IMemoryCache>();
    }
}
