using HotChocolate.Data.Filters;

namespace Confix.Authoring.GraphQL.Components
{
    public class ComponentFilterInputType : FilterInputType<Component>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Component> descriptor)
        {
            descriptor.BindFieldsExplicitly();

            descriptor.Field(t => t.Name);
        }
    }
}
