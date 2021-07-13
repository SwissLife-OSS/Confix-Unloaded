using System;
using System.ComponentModel.DataAnnotations;

namespace Confix.Authoring
{
    public class Component
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Schema { get; set; }

        public string? Values { get; set; }

        public ComponentState State { get; set; }
    }
}
