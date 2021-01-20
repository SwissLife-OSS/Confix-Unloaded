using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Confix.Authoring.GraphQL.DataLoaders;
using Confix.Authoring.Store;
using HotChocolate.Types;

namespace Confix.Authoring.GraphQL
{
    [ExtendObjectType(Name = "Query")]
    public class ApplicationQueries
    {
        private readonly IApplicationService _applicationService;

        public ApplicationQueries(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        public async Task<IEnumerable<Application>> GetApplicationsAsync(
            CancellationToken cancellationToken)
        {
            return await _applicationService.GetAllAsync(cancellationToken);
        }
    }

    public class ApplicationPartType : ObjectType<ApplicationPart>
    {
        protected override void Configure(IObjectTypeDescriptor<ApplicationPart> descriptor)
        {
            descriptor
                .Field("components")
                .ResolveWith<ApplicationResolvers>(_ => _.GetComponentsAsync(default!, default!));
        }
    }

    public class ApplicationPartComponentType : ObjectType<ApplicationPartComponent>
    {
        protected override void Configure(IObjectTypeDescriptor<ApplicationPartComponent> descriptor)
        {
            descriptor.Ignore(x => x.ComponentId);

            descriptor.Field("component")
               .ResolveWith< ApplicationResolvers>(_ => _.GetComponentAsync(default!, default!, default!));
        }
    }

    public class ApplicationResolvers
    {
        private readonly IComponentService _componentService;

        public ApplicationResolvers(IComponentService componentService)
        {
            _componentService = componentService;
        }

        public async Task<IEnumerable<Component>> GetComponentsAsync(
            ApplicationPart part,
            CancellationToken cancellationToken)
        {
            return await _componentService.GetManyAsync(
                part.Components.Select(x => x.ComponentId),
                cancellationToken);
        }

        public async Task<Component> GetComponentAsync(
            ApplicationPartComponent partComponent,
            ComponentByIdDataLoader componentById,
            CancellationToken cancellationToken)
        {
            return await componentById.LoadAsync(partComponent.ComponentId, cancellationToken);
        }
    }
}
