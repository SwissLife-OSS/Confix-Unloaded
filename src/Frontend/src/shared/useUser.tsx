import { graphql } from "babel-plugin-relay/macro";
import { useMemo } from "react";
import { useLazyLoadQuery } from "react-relay";
import {
  useUser_Me_Query,
  Scope as QueryScope,
} from "./__generated__/useUser_Me_Query.graphql";
interface User {
  name: string;
  groups: NonNullable<useUser_Me_Query["response"]["me"]>["groups"];
  hasPermission: (
    scope: Scope,
    namespace: string,
    permission: Permission
  ) => boolean;
}
export type Scope = QueryScope;

export type Permission = keyof NonNullable<
  useUser_Me_Query["response"]["me"]
>["groups"][number]["roles"][number]["roles"][number]["permissions"][number]["permissions"];

export const useUser = (): User => {
  const data = useLazyLoadQuery<useUser_Me_Query>(
    graphql`
      query useUser_Me_Query {
        me {
          name
          namespaces
          groups {
            roles {
              namespace
              roles {
                name
                permissions {
                  scope
                  permissions {
                    isRead
                    isWrite
                    isClaim
                    isPublish
                    isDecrypt
                  }
                }
              }
            }
          }
        }
      }
    `,
    {}
  );

  const hasPermission = useMemo<User["hasPermission"]>(() => {
    const cache = new Map<string, boolean>();
    return (scope, namespace, permission) => {
      const groups = data!.me!.groups;
      const identifier = `${scope}.${namespace}.${permission}`;

      if (!cache.has(identifier)) {
        for (const group of groups) {
          for (const roleScope of group.roles) {
            if (roleScope.namespace !== namespace) {
              continue;
            }
            for (const role of roleScope.roles) {
              for (const { permissions } of role.permissions) {
                if (permissions[permission]) {
                  cache.set(identifier, permissions[permission]);
                  return permissions[permission];
                }
              }
            }
          }
        }
        cache.set(identifier, false);
      }

      return !!cache.get(identifier);
    };
  }, [data]);

  if (!data!.me || !data.me.groups) {
    throw new NotLoggedInError();
  }

  return { name: data.me.name, groups: data.me.groups, hasPermission };
};

const NotLoggedInErrorName = "NotLoggedInError";

class NotLoggedInError extends Error {
  name: string = NotLoggedInErrorName;
  message: string = "The current user is not logged in";
}

export const isNotLoggedInError = (error: Error): error is NotLoggedInError =>
  error.name === NotLoggedInErrorName;

export const Namespaces = {
  Global: "Global",
} as const;
