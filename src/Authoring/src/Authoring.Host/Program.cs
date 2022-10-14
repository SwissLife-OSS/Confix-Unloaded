namespace Confix.Authoring;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureAppConfiguration(x => x
                    .AddJsonFile("appsettings.json")
                    .AddJsonFile("appsettings.user.json", true));
                webBuilder.UseStartup<Startup>();
            });
}
