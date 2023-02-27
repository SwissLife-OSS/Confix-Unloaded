// See https://aka.ms/new-console-template for more information

using System.CommandLine.Parsing;
using Confix.Tooling;

return await new ConfixCommandLine().Build().InvokeAsync(args);
