namespace Confix.Authentication.Authorization;

public record Role(Guid Id, string Name, Permissions Permissions);
