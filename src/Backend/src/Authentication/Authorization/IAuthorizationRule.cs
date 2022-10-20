using System.Diagnostics.CodeAnalysis;

namespace Confix.Authentication.Authorization;

public interface IAuthorizationRule<in T>
{
    ValueTask<bool> IsAuthorizedFromAsync<TOther>(
        TOther? resource,
        Permissions permissions,
        CancellationToken cancellationToken);

    ValueTask<bool> IsAuthorizedAsync(
        [NotNullWhen(true)]T? resource,
        Permissions permissions,
        CancellationToken cancellationToken);
}
