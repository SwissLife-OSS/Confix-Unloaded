import { ConnectionHandler } from "relay-runtime";

export const useConnectionId = (
  connectionKey: string,
  resourceId: string = "root"
) => ConnectionHandler.getConnectionID(resourceId, connectionKey);
