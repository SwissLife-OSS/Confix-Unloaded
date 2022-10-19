namespace Confix.Authoring.GraphQL;

[ExtendObjectType(OperationTypeNames.Query)]
public sealed class EnvironmentQueries
{
    [UsePaging]
    public Task<IQueryable<Environment>> SearchEnvironments(
        [Service] IEnvironmentService environmentService,
        string? search,
        CancellationToken cancellationToken)
    {
        return environmentService.SearchAsync(search, cancellationToken);
    }

    public async Task<Environment?> GetEnvironmentByIdAsync(
        [Service] IEnvironmentService environmentService,
        [ID(nameof(Environment))] Guid id,
        CancellationToken cancellationToken)
    {
        return await environmentService.GetByIdAsync(id, cancellationToken);
    }
}
