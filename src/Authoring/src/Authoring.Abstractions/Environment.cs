using System;
using System.ComponentModel.DataAnnotations;

namespace Confix.Authoring;

public class Environment
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string? Name { get; set; }
}
