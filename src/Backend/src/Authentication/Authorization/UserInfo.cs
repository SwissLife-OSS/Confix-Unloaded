namespace Confix.Authentication.Authorization;

public record UserInfo(
    string Id,
    string? Name,
    string? Email
);
