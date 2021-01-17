using System;
using System.Collections.Generic;

namespace Confix.Authoring.Store
{
    public class Application
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<ApplicationPart> Parts { get; set; }
            = Array.Empty<ApplicationPart>();
    }

    public class ApplicationPart
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public IEnumerable<ApplicationPartComponent> Components { get; set; }
            = Array.Empty<ApplicationPartComponent>();
    }

    public class ApplicationPartComponent
    {
        public string ComponentId { get; set; }
    }

    public class Variable
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsSecret { get; set; }

        public IEnumerable<Guid> AssignedApplicationIds { get; set; }
    }
}
