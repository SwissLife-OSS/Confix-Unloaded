import { config } from "./config";
import { meros } from "meros/browser";
import type { FetchFunction } from "relay-runtime";
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";

export const fetchGraphQL: FetchFunction = (
  params,
  variables,
  _cacheConfig
) => {
  return Observable.create((sink) => {
    (async () => {
      try {
        const response = await fetch(config.graphql.api, {
          body: JSON.stringify({
            query: params.text,
            variables,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const parts = await meros<ExecutionPatchResult>(response);

        if (isAsyncIterable(parts)) {
          for await (const part of parts) {
            if (!part.json) {
              sink.error(new Error("Failed to parse part as json."));
              break;
            }

            // @ts-ignore
            sink.next(part.body);
          }
        } else {
          sink.next(await parts.json());
        }

        sink.complete();
      } catch (error) {
        sink.error(error as Error);
      }
    })();
  });
};

export interface ObjMap<T> {
  [key: string]: T;
}

// this is part of graphql@16, which doesn't yet work with relay
export interface ExecutionPatchResult<
  TData = ObjMap<unknown> | unknown,
  TExtensions = ObjMap<unknown>
> {
  errors?: ReadonlyArray<any>; // GraphQLError
  data?: TData | null;
  path?: ReadonlyArray<string | number>;
  label?: string;
  hasNext: boolean;
  extensions?: TExtensions;
}

function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
  return (
    typeof input === "object" &&
    input !== null &&
    ((input as any)[Symbol.toStringTag] === "AsyncGenerator" ||
      Symbol.asyncIterator in input)
  );
}
