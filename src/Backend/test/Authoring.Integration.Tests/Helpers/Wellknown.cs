namespace Confix.Authoring.Integration.Tests;

public static class Wellknown
{
    public static class Application
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000000");
        public static readonly string Name = "Test Application";
        public static readonly string Namespace = "Test";
        public static readonly int Version = 1;
    }

    public static class ApplicationPart
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000001");
        public static readonly string Name = "Test Application Part";
        public static readonly int Version = 1;
    }

    public static class ApplicationPartComponent
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000002");
        public static readonly int Version = 1;
        public static readonly string Values =
            """
            { "field" : "custom", "nestedField" : { "field" : "custom" } }
            """;
    }

    public static class Component
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000003");
        public static readonly string Name = "Test Component";
        public static readonly int Version = 1;

        public static readonly string Schema =
            """
            type Configuration {
                field: String!
                nestedField: NestedConfiguration!
            }
            type NestedConfiguration {
                field: String!
            }
            """;
        public static readonly string Values =
            """
            { "field" : "default", "nestedField" : { "field" : "defaultNested" } }
            """;
    }

    public static class Variable
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000004");
        public static readonly string Name = "Test Variable";
        public static readonly VariableState State = VariableState.Active;
        public static readonly bool IsSecret = false;
        public static readonly string Namespace = "Test";
        public static readonly int Version = 1;
    }

    public static class Roles
    {
        public static readonly string Main = "main_role";
        public static readonly string Other = "other_role";
    }

    public static class Namespaces
    {
        public static readonly string Default = "Test";
        public static readonly string Other = "Other";
    }

    public static class User
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000005");
        public static readonly string Name = "Test User";
        public static readonly string Email = "user@confix.com";
        public static readonly string Role = "main_role";
    }

    public static class OtherUser
    {
        public static readonly Guid Id = Guid.Parse("00000000-0000-0000-0000-000000000006");
        public static readonly string Name = "Other User";
        public static readonly string Email = "other@config.com";
        public static readonly string Role = "other_role";
    }
}
