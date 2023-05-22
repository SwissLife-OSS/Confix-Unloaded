using Microsoft.Extensions.Caching.Memory;
using Confix.Authoring.Internal;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

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
        => GetValidator().ValidateSchema(schema);

    private void AssertInvalidSchema(string schema)
    {
        // act && assert
        var exception = Assert.Throws<InvalidSchemaException>(() => GetValidator().ValidateSchema(schema));
        exception.Errors.MatchSnapshot();
    }

    #endregion

    #region ValidateValues
    [Fact]
    public void ValidateValues_Primitives_Valid()
        => AssertValidValues(
            """
            {
                "someText": "Sample text",
                "someNumber": 42,
                "someFloat": 3.14,
                "someBoolean": true
            }
            """,
            """
            type Configuration {
                someText: String!
                someNumber: Int!
                someFloat: Float!
                someBoolean: Boolean!
            }
            """);

    [Fact]
    public void ValidateValues_Enums_Valid()
        => AssertValidValues(
            """
            {
                "someText": "Sample text",
                "someEnum": "OPTION_2"
            }
            """,
            """
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
    public void ValidateValues_Arrays_Valid()
        => AssertValidValues(
            """
            {
                "someText": "Sample text",
                "someNumbers": [1, 2, 3],
                "someStrings": ["String 1", "String 2"],
                "someCustom": null,
                "someCustom2": [
                    null,
                    {"unicornCount": 8},
                    {"unicornCount": 12}
                ],
                "someCustom3": [
                    {"unicornCount": 15},
                    {"unicornCount": 20}
                ]
            }

            """,
            """
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
    public void ValidateValues_UnionsInRoot_Valid()
        => AssertValidValues(
            """
            {
                "someField": {
                    "field1": "Sample string"
                },
                "someField1": {
                    "field2": 42
                },
                "someField1": null
            }
            """,
            """
            type Configuration {
                someField: CustomTypeUnion!
                someField1: CustomTypeUnion!
                someField2: CustomTypeUnion
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
    public void ValidateValues_UnionsInArray_Valid()
        => AssertValidValues(
            """
            {
                "someField": [
                    {
                        "field1": "Sample string"
                    },
                    {
                        "field2": 42
                    }
                ]
            }
            """,
            """
            type Configuration {
                someField: [CustomTypeUnion!]
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
    public void ValidateValues_Nested_Valid()
        => AssertValidValues(
            """
            {
                "someText": "Hello, world!",
                "level1": {
                    "field1": "Value 1",
                    "level2": {
                        "field2": "Value 2",
                        "level3": {
                            "field3": "Value 3"
                        }
                    }
                }
            }
            """,
            """
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
    // TODO: null violations should somehow have a better error
    public void ValidateValues_PrimitivesNullViolation_Invalid()
        => AssertInvalidValues(
            """
            {
                "someText": null,
                "someNumber": null,
                "someFloat": null,
                "someBoolean": null,
                "someUnicorn": null,
                "someOtherUnicorn": {"count": null},
                "someOtherCoolUnicorn": {}
            }
            """,
            """
            type Configuration {
                someText: String!
                someNumber: Int!
                someFloat: Float!
                someBoolean: Boolean!
                someUnicorn: Unicorn!
                someOtherUnicorn: Unicorn!
                someOtherCoolUnicorn: Unicorn!
            }
            type Unicorn{
                count: Int!
            }
            """);

    private void AssertValidValues(string jsonValue, string schema)
        => GetValidator().ValidateValues(
            JsonDocument.Parse(jsonValue).RootElement,
            schema);


    private void AssertInvalidValues(string jsonValue, string schema)
    {
        // act && assert
        var exception = Assert.Throws<SchemaViolationException>(() =>
            GetValidator().ValidateValues(
                JsonDocument.Parse(jsonValue).RootElement,
                schema));
        exception.Violations.MatchSnapshot();
    }
    #endregion

    private ISchemaValidator GetValidator()
    {
        var services = new ServiceCollection();
        services.AddMemoryCache();
        services.AddSingleton<ISchemaValidator, SchemaValidator>();
        var serviceProvider = services.BuildServiceProvider();

        return serviceProvider.GetRequiredService<ISchemaValidator>();
    }

}
