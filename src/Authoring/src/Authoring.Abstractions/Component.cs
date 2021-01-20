using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Confix.Authoring
{
    public class Component
    {
        public Guid Id { get; set; }

        public ComponentState State { get; set; }

        public string Name { get; set; }

        public string? Schema { get; set; }
    }

    public enum ComponentState
    {
        Active,
        Deprecated
    }
}
