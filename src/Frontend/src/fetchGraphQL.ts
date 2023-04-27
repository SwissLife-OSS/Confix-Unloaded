import {FetchFunction, GraphQLResponse, Observable} from 'relay-runtime';

import {Part} from 'meros';
import {config} from './config';
import {meros} from 'meros/browser';

const isAsyncIterable = (value: any) =>
  typeof Object(value)[Symbol.asyncIterator] === 'function';

const ErrorMessages = {
  FAILED_FETCH: 'Failed to fetch',
  ERROR_FETCH: 'Error in fetch',
  UNWORKABLE_FETCH: 'Unworkable fetch',
  SOCKET_CLOSED: 'Socket closed',
  GRAPHQL_ERRORS: 'GraphQL error',
};

class NetworkError extends Error {
  constructor(message: string, options: any) {
    super(message, options);

    this.name = 'NetworkError';

    if (options) {
      const {cause, ...meta} = options;

      Object.assign(this, meta);
    }
  }
}

export const fetchGraphQL: FetchFunction = (operation, variables) => {
  return Observable.create((sink) => {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept:
          'application/graphql-response+json;charset=utf-8, multipart/mixed;charset=utf-8',
      },
      body: JSON.stringify({
        id: operation.id ?? undefined,
        query: operation.text ?? undefined,
        variables,
      }),
    };

    (async () => {
      const request = new Request(config.graphql.api, init);

      try {
        const response = await fetch(request);

        // Status code in range 200-299 inclusive (2xx).
        if (response.ok) {
          try {
            const parts = await meros(response);

            if (isAsyncIterable(parts)) {
              for await (const part of parts as AsyncGenerator<
                Part<object, string>,
                any,
                unknown
              >) {
                if (!part.json) {
                  sink.error(
                    new NetworkError(ErrorMessages.UNWORKABLE_FETCH, {
                      request,
                      response,
                    }),
                  );
                  break;
                }

                if ('data' in part.body) {
                  sink.next(part.body as GraphQLResponse);
                } else if ('errors' in part.body) {
                  // If any exceptions occurred when processing the request,
                  // throw an error to indicate to the developer what went wrong.
                  sink.error(
                    new NetworkError(ErrorMessages.GRAPHQL_ERRORS, {
                      request,
                      response,
                      errors: part.body.errors,
                    }),
                  );
                  break;
                }

                if ('incremental' in part.body) {
                  for (const chunk of (part.body as any).incremental) {
                    if ('data' in chunk) {
                      sink.next({
                        ...chunk,
                        hasNext: (part.body as any).hasNext,
                      });
                    } else {
                      if (chunk.items) {
                        // All but the non-final path segments refers to the location
                        // of the list field containing the `@stream` directive.
                        // The final segment of the path list is an integer.
                        //
                        // Note: We must "copy" to avoid mutations.
                        const location = chunk.path.slice(0, -1);
                        let index = chunk.path.at(-1);

                        for (const item of chunk.items) {
                          sink.next({
                            ...chunk,
                            path: location.concat(index++),
                            data: item,
                            hasNext: (part.body as any).hasNext,
                          });
                        }
                      } else {
                        sink.next({
                          ...chunk,
                          data: chunk.items,
                          hasNext: (part.body as any).hasNext,
                        });
                      }
                    }
                  }
                }
              }
            } else {
              const json = await response.json();

              if ('data' in json) {
                sink.next(json);
              } else if ('errors' in json) {
                // If any exceptions occurred when processing the request,
                // throw an error to indicate to the developer what went wrong.
                sink.error(
                  new NetworkError(ErrorMessages.GRAPHQL_ERRORS, {
                    request,
                    response,
                    errors: json.errors,
                  }),
                );
              }
            }

            sink.complete();
          } catch (err) {
            sink.error(
              new NetworkError(ErrorMessages.UNWORKABLE_FETCH, {
                cause: err,
                request,
                response,
              }),
              true,
            );
          }
        } else {
          sink.error(
            new NetworkError(ErrorMessages.ERROR_FETCH, {request, response}),
          );
        }
      } catch (err) {
        sink.error(
          new NetworkError(ErrorMessages.FAILED_FETCH, {cause: err, request}),
          true,
        );
      }
    })();
  });
};
