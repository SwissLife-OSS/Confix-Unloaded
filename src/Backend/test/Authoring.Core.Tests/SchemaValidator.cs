using Microsoft.Extensions.Caching.Memory;
using Confix.Authoring.Internal;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Core.Tests;

public class SchemaValidatorTests
{
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
                someField: UnionOfPrimitivesOrCustomTypes!
            }

            union UnionOfPrimitivesOrCustomTypes = PrimitiveUnion | CustomTypeUnion
            union PrimitiveUnion = String | Int | Boolean
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

    private void AssertValidSchema(string schema)
        => new SchemaValidator(GetMemoryCache()).ValidateSchema(schema);

    private IMemoryCache GetMemoryCache()
    {
        var services = new ServiceCollection();
        services.AddMemoryCache();
        var serviceProvider = services.BuildServiceProvider();

        return serviceProvider.GetRequiredService<IMemoryCache>();
    }
}
