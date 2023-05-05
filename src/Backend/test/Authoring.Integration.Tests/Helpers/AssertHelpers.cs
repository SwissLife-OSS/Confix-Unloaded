using Snapshooter.Xunit;
using StrawberryShake;
using Xunit;

namespace Confix.Authoring.Integration.Tests;

public static class AssertHelpers
{
    public static void AssertNoErrors<T>(this IOperationResult<T> result) where T : class
    {
        Assert.NotNull(result);
        Assert.Empty(result.Errors);
    }

    public static void MatchSnapshot<T>(this IOperationResult<T> result) where T : class
    {
        result.Data.MatchSnapshot();
    }
}
