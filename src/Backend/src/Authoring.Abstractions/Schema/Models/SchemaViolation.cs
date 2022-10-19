using System.ComponentModel.DataAnnotations;

namespace Confix.Authoring;

public sealed class SchemaViolation
{
    public SchemaViolation(IReadOnlyList<object> path, string? code)
    {
        Path = path;
        Code = code;
    }

    public IReadOnlyList<object> Path { get; }

    [Required]
    public string? Code { get; }
}
