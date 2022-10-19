namespace Confix.Authoring.GraphQL;

public class SdlType : StringType
{
    public SdlType() : base("SDL", bind: BindingBehavior.Explicit)
    {
    }
}
