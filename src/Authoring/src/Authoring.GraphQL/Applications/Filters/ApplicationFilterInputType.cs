using Confix.Authoring.Store;
using HotChocolate.Data.Filters;

namespace Confix.Authoring.GraphQL.Applications.Filters;

public class ApplicationFilterInputType : FilterInputType<Application>
{
    protected override void Configure(IFilterInputTypeDescriptor<Application> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(t => t.Name);
        descriptor.Field(t => t.Namespace);
    }
}
