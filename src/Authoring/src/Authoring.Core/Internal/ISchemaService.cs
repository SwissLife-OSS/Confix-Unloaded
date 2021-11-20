using System.Collections.Generic;
using HotChocolate;

namespace Confix.Authoring.Internal
{
    public interface ISchemaService
    {
        string CreateValuesForSchema(string schemaSdl, IDictionary<string, object?> values);

        string CreateValuesForSchema(ISchema schema, IDictionary<string, object?> values);

        ISchema CreateSchema(string schema);
    }
}
