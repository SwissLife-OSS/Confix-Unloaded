using System.Diagnostics;
using System.Text;
using HotChocolate.Diagnostics;
using Microsoft.Extensions.ObjectPool;
using OpenTelemetry.Trace;

namespace Confix.Authoring.GraphQL;

internal sealed class GraphQLActivityEnricher : ActivityEnricher
{
    public GraphQLActivityEnricher(
        ObjectPool<StringBuilder> stringBuilderPool,
        InstrumentationOptions options)
        : base(stringBuilderPool, options)
    {
    }

    protected override string CreateRootActivityName(
        Activity activity,
        Activity root,
        string operationDisplayName) => operationDisplayName;

    protected override void EnrichError(IError error, Activity activity)
    {
        // Attach the error on the first server activity (transaction).
        // https://github.com/axw/apm-server/blob/df5516272015f32f9f6c01014dab38fae1304682/processor/otel/consumer.go#L109
        Activity serverActivity = GetFirstServerActivity(activity);
        if (error.Exception is not null)
        {
            serverActivity.RecordException(error.Exception);
        }
        else
        {
            serverActivity.SetOrAppendTag("exception.type", error.Code ?? "GraphQL Error");
            serverActivity.SetOrAppendTag("exception.message", error.Message);
        }

        // The span will be marked with error on the base enricher.
        base.EnrichError(error, activity);
    }

    private static Activity GetFirstServerActivity(Activity activity)
    {
        Activity current = activity;

        while (current.Parent is not null && current.Kind != ActivityKind.Server)
        {
            current = current.Parent;
        }

        return current;
    }
}

internal static class GraphQLActivityExtensions
{
    public static void SetOrAppendTag(this Activity activity, string key, string value)
    {
        var tagValue = activity.GetTagItem(key) as string;
        tagValue = tagValue is not null ? $"{tagValue}\n\r{value}" : value;
        activity.SetTag(key, tagValue);
    }
}
