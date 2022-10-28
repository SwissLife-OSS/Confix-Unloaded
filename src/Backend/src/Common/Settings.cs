// ReSharper disable file MemberHidesStaticFromOuterClass

namespace Confix.Common;

public static class Settings
{
    public static class Confix
    {
        public const string Section = nameof(Confix);

        public static class Authoring
        {
            public const string Section = $"{Confix.Section}:{nameof(Authoring)}";

            public static class Database
            {
                public const string Section = $"{Authoring.Section}:{nameof(Database)}";

                public static class Mongo
                {
                    public const string Section = $"{Database.Section}:{nameof(Mongo)}";
                }
            }

            public static class Seed
            {
                public const string Section = $"{Authoring.Section}:{nameof(Seed)}";

                public static class AdminRequirement
                {
                    public const string Section = $"{Seed.Section}:{nameof(AdminRequirement)}";
                }
            }

            public static class Authentication
            {
                public const string Section = $"{Authoring.Section}:{nameof(Authentication)}";

                public static class OpenIdConnect
                {
                    public const string Section =
                        $"{Authentication.Section}:{nameof(OpenIdConnect)}";
                }

                public static class JwtBearer
                {
                    public const string Section = $"{Authentication.Section}:{nameof(JwtBearer)}";
                }
            }

            public static class Vault
            {
                public const string Section = $"{Authoring.Section}:{nameof(Vault)}";

                public static class HttpClient
                {
                    public const string Section = $"{Vault.Section}:{nameof(HttpClient)}";
                }
            }
        }

        public static class Vault
        {
            public const string Section = $"{Confix.Section}:{nameof(Vault)}";

            public static class Database
            {
                public const string Section = $"{Vault.Section}:{nameof(Database)}";

                public static class Mongo
                {
                    public const string Section = $"{Database.Section}:{nameof(Mongo)}";
                }
            }

            public static class Authentication
            {
                public const string Section = $"{Vault.Section}:{nameof(Authentication)}";

                public static class JwtBearer
                {
                    public const string Section = $"{Authentication.Section}:{nameof(JwtBearer)}";
                }
            }
        }

        public static class Encryption
        {
            public const string Section = $"{Confix.Section}:{nameof(Encryption)}";

            public static class KeyEncryptionKey
            {
                public const string Section = $"{Encryption.Section}:{nameof(KeyEncryptionKey)}";

                public static class AzureKeyVault
                {
                    public const string Section =
                        $"{KeyEncryptionKey.Section}:{nameof(AzureKeyVault)}";
                }
            }

            public static class DataEncryptionKey
            {
                public const string Section = $"{Encryption.Section}:{nameof(DataEncryptionKey)}";

                public static class Mongo
                {
                    public const string Section = $"{DataEncryptionKey.Section}:{nameof(Mongo)}";
                }
            }
        }
    }
}
