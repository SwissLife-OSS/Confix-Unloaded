using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Confix.Authoring;
using Confix.Authoring.Store.Mongo;
using MongoDB.Driver;
using MongoDB.Extensions.Context;
using Snapshooter.Xunit;
using Squadron;
using Xunit;

namespace Authoring.Store.Mongo.Tests
{
    public class VariableValueStoreTests : IClassFixture<MongoResource>
    {
        private readonly IMongoDatabase _mongoDatabase;
        private readonly IConfixAuthorDbContext _docuStoreDbContext;

        public VariableValueStoreTests(MongoResource mongoResource)
        {
            _mongoDatabase = mongoResource.CreateDatabase();
            _mongoDatabase.Client.DisableTableScan();

            var mongoOptions = new MongoOptions
            {
                ConnectionString = mongoResource.ConnectionString,
                DatabaseName = _mongoDatabase.DatabaseNamespace.DatabaseName
            };

            _docuStoreDbContext = new ConfixAuthorDbContext(mongoOptions);
        }

        [Fact]
        public async Task UpsertAsync_SaveNewVariableValue_SuccessfullyInserted()
        {
            // Arrange
            VariableValue variableValue = new VariableValue
            {
                Id = Guid.Parse("4674d60d-7f3e-4b54-8bfb-b484303f62b0"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = "This is a insertion test.",
                Encryption = null
            };

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            await variableValueStore.UpsertAsync(variableValue, default);

            // Assert
            Snapshot.Match(GetVariableValueDump());
        }

        [Fact]
        public async Task UpsertAsync_SaveNewVariableValueEmptyValues_SuccessfullyInserted()
        {
            // Arrange
            VariableValue variableValue = new VariableValue
            {
                Id = Guid.Parse("4674d60d-7f3e-4b54-8bfb-b484303f62b0"),
                Key = new VariableKey
                {
                    VariableId = null,
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = string.Empty,
                Encryption = null
            };

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            await variableValueStore.UpsertAsync(variableValue, default);

            // Assert
            Snapshot.Match(GetVariableValueDump());
        }

        [Fact]
        public async Task UpsertAsync_UpdateVariableByExistingKey_SuccessfullyUpdated()
        {
            // Arrange
            VariableValue variableValue = new VariableValue
            {
                Id = Guid.Parse("4674d60d-7f3e-4b54-8bfb-b484303f62b0"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = "This is a insertion test.",
                Encryption = null
            };

            InsertVariableValues(variableValue);

            variableValue.Value = "Updated variable Value";
            variableValue.Encryption = new VariableEncryptionInfo
            {
                Algorithm = "AES256",
                Key = "xyz",
                KeyProvider = "AzureKeyVault"
            };

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            await variableValueStore.UpsertAsync(variableValue, default);

            // Assert
            Snapshot.Match(GetVariableValueDump());
        }

        [Fact]
        public async Task UpsertAsync_SaveVariableWithNewKey_NewInserted()
        {
            // Arrange
            VariableValue variableValue = new VariableValue
            {
                Id = Guid.Parse("4674d60d-7f3e-4b54-8bfb-b484303f62b0"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = "This is a insertion test.",
                Encryption = null
            };

            InsertVariableValues(variableValue);

            variableValue.Id = Guid.Parse("6b9fc641-988e-4182-a870-037aff5cfc1f");
            variableValue.Key.EnvironmentId = Guid.Parse("04e057a5-0140-404c-9c94-92ad7702a63c");
            variableValue.Value = "Newly inserted variable Value";
            variableValue.Encryption = new VariableEncryptionInfo
            {
                Algorithm = "AES256",
                Key = "xyz",
                KeyProvider = "AzureKeyVault"
            };

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            await variableValueStore.UpsertAsync(variableValue, default);

            // Assert
            Snapshot.Match(GetVariableValueDump());
        }

        [Fact]
        public async Task GetByKeyAsync_GetAllKeyFieldsNullVariable_ReturnsRightVariable()
        {
            VariableValue variableValue0 = CreateAllKeyFieldsNullVariable();
            VariableValue variableValue1 = CreateOneKeyFieldSetVariable();
            VariableValue variableValue2 = CreateTwoKeyFieldsSetVariable();
            VariableValue variableValue3 = CreateAllKeyFieldsSetVariable();

            InsertVariableValues(
                variableValue0, variableValue1, variableValue2, variableValue3);

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            VariableValue? foundVariableValue = await variableValueStore
                .GetByKeyAsync(variableValue0.Key, default);

            // Assert
            Snapshot.Match(foundVariableValue);
        }

        [Fact]
        public async Task GetByKeyAsync_GetOneKeyFieldSetVariable_ReturnsRightVariable()
        {
            VariableValue variableValue0 = CreateAllKeyFieldsNullVariable();
            VariableValue variableValue1 = CreateOneKeyFieldSetVariable();
            VariableValue variableValue2 = CreateTwoKeyFieldsSetVariable();
            VariableValue variableValue3 = CreateAllKeyFieldsSetVariable();

            InsertVariableValues(
                variableValue0, variableValue1, variableValue2, variableValue3);

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            VariableValue? foundVariableValue = await variableValueStore
                .GetByKeyAsync(variableValue1.Key, default);

            // Assert
            Snapshot.Match(foundVariableValue);
        }

        [Fact]
        public async Task GetByKeyAsync_GetTwoKeyFieldsSetVariable_ReturnsRightVariable()
        {
            VariableValue variableValue0 = CreateAllKeyFieldsNullVariable();
            VariableValue variableValue1 = CreateOneKeyFieldSetVariable();
            VariableValue variableValue2 = CreateTwoKeyFieldsSetVariable();
            VariableValue variableValue3 = CreateAllKeyFieldsSetVariable();

            InsertVariableValues(
                variableValue0, variableValue1, variableValue2, variableValue3);

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            VariableValue? foundVariableValue = await variableValueStore
                .GetByKeyAsync(variableValue2.Key, default);

            // Assert
            Snapshot.Match(foundVariableValue);
        }

        [Fact]
        public async Task GetByKeyAsync_GetAllKeyFieldsSetVariable_ReturnsRightVariable()
        {
            VariableValue variableValue0 = CreateAllKeyFieldsNullVariable();
            VariableValue variableValue1 = CreateOneKeyFieldSetVariable();
            VariableValue variableValue2 = CreateTwoKeyFieldsSetVariable();
            VariableValue variableValue3 = CreateAllKeyFieldsSetVariable();

            InsertVariableValues(
                variableValue0, variableValue1, variableValue2, variableValue3);

            VariableValueStore variableValueStore =
                new VariableValueStore(_docuStoreDbContext);

            // Act
            VariableValue? foundVariableValue = await variableValueStore
                .GetByKeyAsync(variableValue3.Key, default);

            // Assert
            Snapshot.Match(foundVariableValue);
        }

        private static VariableValue CreateAllKeyFieldsSetVariable()
        {
            return new VariableValue
            {
                Id = Guid.Parse("F39140E5-B24C-48F3-AACD-9864F76F53A6"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = Guid.Parse("53055060-7173-4839-8A16-EF7845A0D1B9"),
                    EnvironmentId = Guid.Parse("04E057A5-0140-404C-9C94-92AD7702A63C"),
                    PartId = Guid.Parse("9442BFF1-6AA9-4416-8C89-BA58EC2A1AA4")
                },
                Value = "This is a insertion test value 3.",
                Encryption = null
            };
        }

        private static VariableValue CreateTwoKeyFieldsSetVariable()
        {
            return new VariableValue
            {
                Id = Guid.Parse("6B9FC641-988E-4182-A870-037AFF5CFC1F"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = null,
                    EnvironmentId = Guid.Parse("04E057A5-0140-404C-9C94-92AD7702A63C"),
                    PartId = null
                },
                Value = "This is a insertion test value 2.",
                Encryption = null
            };
        }

        private static VariableValue CreateOneKeyFieldSetVariable()
        {
            return new VariableValue
            {
                Id = Guid.Parse("4674d60d-7f3e-4b54-8bfb-b484303f62b0"),
                Key = new VariableKey
                {
                    VariableId = Guid.Parse("98047CEA-E467-4D7A-8EB1-73F617BDCF75"),
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = "This is a insertion test value 1.",
                Encryption = null
            };
        }

        private static VariableValue CreateAllKeyFieldsNullVariable()
        {
            // Arrange
            return new VariableValue
            {
                Id = Guid.Parse("DDF1670C-B4FF-4926-AC39-F6A7BDD3D341"),
                Key = new VariableKey
                {
                    VariableId = null,
                    ApplicationId = null,
                    EnvironmentId = null,
                    PartId = null
                },
                Value = "This is a insertion test value 0.",
                Encryption = null
            };
        }

        private List<VariableValue> GetVariableValueDump()
        {
            return _mongoDatabase
                .GetCollection<VariableValue>("variable_value")
                .Find(FilterDefinition<VariableValue>.Empty).ToList();
        }

        private void InsertVariableValues(params VariableValue[] variableValues)
        {
            _mongoDatabase
                .GetCollection<VariableValue>("variable_value")
                .InsertMany(variableValues);
        }
    }
}
