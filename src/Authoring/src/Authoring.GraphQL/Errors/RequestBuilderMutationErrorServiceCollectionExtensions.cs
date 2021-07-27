using Confix.Authoring.GraphQL;
using HotChocolate.Execution.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RequestBuilderMutationErrorServiceCollectionExtensions
    {
        public static IRequestExecutorBuilder AddMutationErrors(
            this IRequestExecutorBuilder builder)
        {
            builder.AddInterfaceType<ErrorInterfaceType>();
            return builder.TryAddTypeInterceptor<MutationErrorTypeInterceptor>();
        }
    }
}
