using System.Net.Mime;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;

namespace Confix.Authoring.UI;

internal sealed class EmbeddedUiMiddleware
{
    private readonly IContentTypeProvider _contentTypeProvider;
    private readonly RequestDelegate _next;
    private readonly IFileProvider _fileProvider;

    public EmbeddedUiMiddleware(RequestDelegate next)
    {
        _next = next;
        _contentTypeProvider = new FileExtensionContentTypeProvider();
        _fileProvider =
            new ManifestEmbeddedFileProvider(typeof(EmbeddedUiMiddleware).Assembly, "UI");
    }

    public Task Invoke(HttpContext context)
    {
        var hasContentType =
            _contentTypeProvider.TryGetContentType(context.Request.Path, out var contentType);

        var fileInfo = _fileProvider.GetFileInfo(context.Request.Path.Value!);

        if (!fileInfo.Exists && !hasContentType)
        {
            contentType = MediaTypeNames.Text.Html;
            fileInfo = _fileProvider.GetFileInfo("/index.html");
        }

        if (fileInfo.Exists && contentType is not null)
        {
            SetHeaders(context, fileInfo);
            context.Response.ContentType = contentType;

            return context.Response.SendFileAsync(fileInfo);
        }

        return _next(context);
    }

    private static void SetHeaders(HttpContext context, IFileInfo fileInfo)
    {
        var last = fileInfo.LastModified;

        var lastModified = new DateTimeOffset(
                last.Year,
                last.Month,
                last.Day,
                last.Hour,
                last.Minute,
                last.Second,
                last.Offset)
            .ToUniversalTime();

        long etagHash = lastModified.ToFileTime() ^ fileInfo.Length;
        var etag = new EntityTagHeaderValue($"\"{Convert.ToString(etagHash, 16)}\"");

        var headers = context.Response.GetTypedHeaders();
        headers.LastModified = fileInfo.LastModified;
        headers.ETag = etag;
    }
}
