using System.Reflection;
using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Confix.Authoring.GraphQL;

internal sealed class ErrorLoggingDiagnosticEventListener : ExecutionDiagnosticEventListener
{
    public override IDisposable ExecuteRequest(IRequestContext context)
    {
        return new ExecuteRequestScope(context);
    }

    private sealed class ExecuteRequestScope : IDisposable
    {
        private readonly IRequestContext _context;

        public ExecuteRequestScope(IRequestContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            var factory = _context.Services.GetRequiredService<ILoggerFactory>();
            var logger = factory.CreateLogger(Assembly.GetEntryAssembly()?.GetName().Name ?? "unknown");
            if (_context.Exception is { })
            {
                logger.LogError("Unexpected execution exception", _context.Exception);
            }

            if (_context.Result is IQueryResult { Errors.Count: > 0 } queryResult)
            {
                foreach (IError error in queryResult.Errors)
                {
                    logger.LogError("Unexpected execution exception", error);
                }
            }
        }
    }
}
