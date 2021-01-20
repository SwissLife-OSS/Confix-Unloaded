using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public static class VariableValueExtensions
    {
        public static string BuildId(this VariableValue value)
        {
            return string.Join("-", new string[]
            {
                value.VariableId.ToString("N"),
                value.EnvironmentId?.ToString("N") ?? "g",
                value.ApplicationId?.ToString("N") ?? "g",
                value.PartId?.ToString("N") ?? "g"
            });
        }
    }
}
