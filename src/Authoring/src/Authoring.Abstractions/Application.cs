using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Confix.Authoring.Store
{
    public class Application
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public string? Namespace { get; set; }

        public ICollection<ApplicationPart> Parts { get; set; } =
            new List<ApplicationPart>();
    }

    public class ApplicationPart
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        public ICollection<ApplicationPartComponent> Components { get; set; } =
            new List<ApplicationPartComponent>();
    }

    public class ApplicationPartComponent
    {
        public Guid ComponentId { get; set; }
    }

    public class ComponentValue
    {

        public string Name { get; }

        public object Value { get; }
    }
}
