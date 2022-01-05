using System;
using System.ComponentModel.DataAnnotations;
using HotChocolate.Types.Relay;

namespace Confix.Authoring
{
    public class Component
    {
        [ID]
        public Guid Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Schema { get; set; }

        public string? Values { get; set; }

        public int Version { get; set; }

        public ComponentState State { get; set; }
    }
}
