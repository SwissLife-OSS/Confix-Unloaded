using System.Transactions;

namespace Confix.Common;

public static class Transactions
{
    public static TransactionScope Create(
        TransactionScopeOption options = TransactionScopeOption.Required,
        TransactionScopeAsyncFlowOption asyncFlowOption = TransactionScopeAsyncFlowOption.Enabled)
    {
        return new TransactionScope(options, asyncFlowOption);
    }
}

