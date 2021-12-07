using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring.Store
{
    public class Application
    {
        [ID]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string? Namespace { get; set; }

        public ICollection<ApplicationPart> Parts { get; set; } =
            new List<ApplicationPart>();
    }

    public class ApplicationPart
    {
        [ID]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public ICollection<ApplicationPartComponent> Components { get; set; } =
            new List<ApplicationPartComponent>();
    }

    public class ApplicationPartComponent
    {
        [ID]
        public Guid Id { get; set; }

        public Guid ComponentId { get; set; }

        public string? Values { get; set; }
    }
}
