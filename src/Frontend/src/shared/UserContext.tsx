import { createContext, useContext } from "react";

import { FullPageLoader } from "./Wrapper";
import { UserContextProviderQuery } from "../__generated__/UserContextProviderQuery.graphql";
import { config } from "../config";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";

export interface UserContextData
  extends NonNullable<UserContextProviderQuery["response"]["me"]> {
  hasEnvironmentAccess: boolean;
  hasIdentityAccess: boolean;
}

const UserContext = createContext<UserContextData | null>(null);

export const useUser = () => {
  const contextData = useContext(UserContext);
  if (!contextData) {
    throw new Error("Context not set");
  }

  return contextData;
};

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { me } = useLazyLoadQuery<UserContextProviderQuery>(
    graphql`
      query UserContextProviderQuery {
        me {
          name
          componentNamespaces: namespaceGrants(scope: COMPONENT) {
            namespace
          }
          environmentNamespaces: namespaceGrants(scope: ENVIRONMENT) {
            permission {
              isRead
            }
          }
          identityNamespaces: namespaceGrants(scope: IDENTITY) {
            permission {
              isRead
            }
          }
        }
      }
    `,
    {}
  );
  if (!me) {
    window.location.href =
      config.identity.signInPath +
      "?returnUrl=" +
      encodeURI(window.location.href.replace(window.location.origin, ""));
    return <FullPageLoader message={"Authenticating ... "} />;
  }

  return (
    <UserContext.Provider
      value={{
        ...me,
        hasEnvironmentAccess:
          me.environmentNamespaces.filter((g) => g.permission.isRead).length >
          0,
        hasIdentityAccess:
          me.identityNamespaces.filter((g) => g.permission.isRead).length > 0,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
