using Confix.Authoring.Store;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;

namespace Confix.Authoring.Integration.Tests;

public sealed class TestDataProvider
{
    private readonly IServiceProvider _serviceProvider;
    private readonly List<Func<IServiceProvider, Task>> _registrations = new();

    public TestDataProvider(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public TestDataProvider AddApplication(Func<Application, Application>? configure = null)
    {
        _registrations.Add(async sp =>
        {
            var store = sp.GetRequiredService<IApplicationStore>();
            var application = new Application(
                Wellknown.Application.Id,
                Wellknown.Application.Name,
                Wellknown.Application.Namespace)
            {
                Parts = new List<ApplicationPart>()
                {
                    new(Wellknown.ApplicationPart.Id, Wellknown.ApplicationPart.Name)
                    {
                        Components = new List<ApplicationPartComponent>()
                        {
                            new(Wellknown.ApplicationPartComponent.Id,
                                Wellknown.Component.Id,
                                Wellknown.ApplicationPartComponent.Version,
                                Wellknown.ApplicationPartComponent.Values)
                        }
                    }
                }
            };

            if (configure is not null)
            {
                application = configure(application);
            }

            await store.AddAsync(application, CancellationToken.None);
        });

        return this;
    }

    public TestDataProvider AddComponent(Func<Component, Component>? configure = null)
    {
        _registrations.Add(async sp =>
        {
            var store = sp.GetRequiredService<IComponentStore>();
            var component = new Component(
                Wellknown.Component.Id,
                Wellknown.Component.Name,
                Wellknown.Component.Schema,
                Wellknown.Component.Values,
                Wellknown.Namespaces.Default,
                new[] { new NamespaceComponentScope(Wellknown.Namespaces.Default) },
                Wellknown.Component.Version);

            if (configure is not null)
            {
                component = configure(component);
            }

            await store.AddAsync(component, CancellationToken.None);
        });

        return this;
    }

    public TestDataProvider AddVariable(Func<Variable, Variable>? configure = null)
    {
        _registrations.Add(async sp =>
        {
            var store = sp.GetRequiredService<IVariableStore>();
            var variable = new Variable(
                Wellknown.Variable.Id,
                VariableState.Active,
                Wellknown.Variable.Name,
                Wellknown.Variable.IsSecret,
                Wellknown.Variable.Namespace);

            if (configure is not null)
            {
                variable = configure(variable);
            }

            await store.UpdateAsync(variable, CancellationToken.None);
        });

        return this;
    }

    public async Task RunAsync()
    {
        foreach (var registration in _registrations)
        {
            await registration(_serviceProvider);
        }
    }

    public static TestDataProvider From(IServiceProvider services) => new(services);

    public static TestDataProvider From(IRequestExecutor executor)
        => new(executor.Services.GetApplicationServices());
}

public static class DataTestExecutorBuilder
{
    public static TestExecutorBuilder SetupDb(
        this TestExecutorBuilder builder,
        Action<TestDataProvider> configure)
    {
        builder.Setup(async sp =>
        {
            var dataProvider = TestDataProvider.From(sp);
            configure(dataProvider);
            await dataProvider.RunAsync();
        });
        return builder;
    }
}
