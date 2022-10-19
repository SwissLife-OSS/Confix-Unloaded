namespace Confix.Common;

public static class TaskHelper
{
    public static async Task<(T1, T2)> WhenAll<T1, T2>(Task<T1> t1, Task<T2> t2)
    {
        return (await t1, await t2);
    }

    public static async Task<(T1, T2, T3)> WhenAll<T1, T2, T3>(
        Task<T1> t1,
        Task<T2> t2,
        Task<T3> t3)
    {
        return (await t1, await t2, await t3);
    }

    public static async Task<(T1, T2, T3, T4)> WhenAll<T1, T2, T3, T4>(
        Task<T1> t1,
        Task<T2> t2,
        Task<T3> t3,
        Task<T4> t4)
    {
        return (await t1, await t2, await t3, await t4);
    }
}
