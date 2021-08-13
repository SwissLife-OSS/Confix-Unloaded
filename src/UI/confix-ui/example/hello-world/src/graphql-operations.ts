import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import { GraphQLError } from "graphql-request/dist/types";
import { print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  SDL: any;
  UUID: any;
};

export type AddComponentsToApplicationPartInput = {
  applicationPartId: Scalars["ID"];
  componentIds: Array<Scalars["ID"]>;
};

export type AddComponentsToApplicationPartPayload = {
  __typename?: "AddComponentsToApplicationPartPayload";
  application?: Maybe<Application>;
  applicationPart?: Maybe<ApplicationPart>;
  query: Query;
};

export type Application = Node & {
  __typename?: "Application";
  id: Scalars["ID"];
  name: Scalars["String"];
  namespace?: Maybe<Scalars["String"]>;
  parts: Array<ApplicationPart>;
};

/** A connection to a list of items. */
export type ApplicationConnection = {
  __typename?: "ApplicationConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ApplicationEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Application>>;
};

/** An edge in a connection. */
export type ApplicationEdge = {
  __typename?: "ApplicationEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Application;
};

export type ApplicationFilterInput = {
  and?: Maybe<Array<ApplicationFilterInput>>;
  or?: Maybe<Array<ApplicationFilterInput>>;
  name?: Maybe<StringOperationFilterInput>;
  namespace?: Maybe<StringOperationFilterInput>;
};

export type ApplicationIdInvalid = IUserError & {
  __typename?: "ApplicationIdInvalid";
  code: Scalars["String"];
  message: Scalars["String"];
  applicationId: Scalars["ID"];
};

export type ApplicationNameTaken = IUserError & {
  __typename?: "ApplicationNameTaken";
  applicationName: Scalars["String"];
  code: Scalars["String"];
  message: Scalars["String"];
};

export type ApplicationPart = Node & {
  __typename?: "ApplicationPart";
  id: Scalars["ID"];
  name: Scalars["String"];
  components: Array<ApplicationPartComponent>;
};

export type ApplicationPartComponent = {
  __typename?: "ApplicationPartComponent";
  definition: Component;
  values?: Maybe<Scalars["Any"]>;
};

export type ApplicationPartIdInvalid = IUserError & {
  __typename?: "ApplicationPartIdInvalid";
  code: Scalars["String"];
  message: Scalars["String"];
  applicationPartId: Scalars["ID"];
};

export type ApplicationPartNameTaken = IUserError & {
  __typename?: "ApplicationPartNameTaken";
  applicationName: Scalars["String"];
  code: Scalars["String"];
  message: Scalars["String"];
};

export enum ApplyPolicy {
  BeforeResolver = "BEFORE_RESOLVER",
  AfterResolver = "AFTER_RESOLVER",
}

export type Component = Node & {
  __typename?: "Component";
  id: Scalars["ID"];
  name: Scalars["String"];
  state: ComponentState;
  schemaSdl?: Maybe<Scalars["SDL"]>;
  schema?: Maybe<Scalars["Any"]>;
  values?: Maybe<Scalars["Any"]>;
  defaults?: Maybe<Scalars["Any"]>;
  schemaViolations: Array<SchemaViolation>;
};

/** A connection to a list of items. */
export type ComponentConnection = {
  __typename?: "ComponentConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<ComponentEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Component>>;
};

/** An edge in a connection. */
export type ComponentEdge = {
  __typename?: "ComponentEdge";
  /** A cursor for use in pagination. */
  cursor: Scalars["String"];
  /** The item at the end of the edge. */
  node: Component;
};

export enum ComponentState {
  Active = "ACTIVE",
  Deprecated = "DEPRECATED",
}

export type CreateApplicationInput = {
  name: Scalars["String"];
  namespace?: Maybe<Scalars["String"]>;
  parts?: Maybe<Array<Scalars["String"]>>;
};

export type CreateApplicationPayload = {
  __typename?: "CreateApplicationPayload";
  application?: Maybe<Application>;
  query: Query;
};

export type CreateComponentInput = {
  name: Scalars["String"];
  schema?: Maybe<Scalars["String"]>;
  values?: Maybe<Scalars["Any"]>;
};

export type CreateComponentPayload = {
  __typename?: "CreateComponentPayload";
  component: Component;
  query: Query;
};

export type CreateVariableInput = {
  name: Scalars["String"];
  isSecret: Scalars["Boolean"];
  namespace?: Maybe<Scalars["String"]>;
  defaultValue?: Maybe<Scalars["String"]>;
};

export type DeleteVariableValueInput = {
  id: Scalars["ID"];
};

export type DeleteVariableValuePayload = {
  __typename?: "DeleteVariableValuePayload";
  deletedId?: Maybe<Scalars["UUID"]>;
  variable?: Maybe<Variable>;
  query: Query;
};

export type IUserError = {
  code: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createApplication: CreateApplicationPayload;
  renameApplication: RenameApplicationPayload;
  renameApplicationPart: RenameApplicationPartPayload;
  addComponentsToApplicationPart: AddComponentsToApplicationPartPayload;
  createVariable: UpdateVariablePayload;
  saveVariableValue: UpdateVariableValuePayload;
  deleteVariableValue: DeleteVariableValuePayload;
  createComponent: CreateComponentPayload;
  renameComponent: RenameComponentPayload;
  updateComponentSchema: UpdateComponentSchemaPayload;
  updateComponentValues: UpdateComponentValuesPayload;
};

export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};

export type MutationRenameApplicationArgs = {
  input: RenameApplicationInput;
};

export type MutationRenameApplicationPartArgs = {
  input: RenameApplicationPartInput;
};

export type MutationAddComponentsToApplicationPartArgs = {
  input: AddComponentsToApplicationPartInput;
};

export type MutationCreateVariableArgs = {
  input: CreateVariableInput;
};

export type MutationSaveVariableValueArgs = {
  input: SaveVariableValueInput;
};

export type MutationDeleteVariableValueArgs = {
  input: DeleteVariableValueInput;
};

export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};

export type MutationRenameComponentArgs = {
  input: RenameComponentInput;
};

export type MutationUpdateComponentSchemaArgs = {
  input: UpdateComponentSchemaInput;
};

export type MutationUpdateComponentValuesArgs = {
  input: UpdateComponentValuesInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars["ID"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars["Boolean"];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Lookup nodes by a list of IDs. */
  nodes: Array<Maybe<Node>>;
  applications?: Maybe<ApplicationConnection>;
  applicationById?: Maybe<Application>;
  variables: Array<Variable>;
  variable: Variable;
  components?: Maybe<ComponentConnection>;
  componentById?: Maybe<Component>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryNodesArgs = {
  ids: Array<Scalars["ID"]>;
};

export type QueryApplicationsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  where?: Maybe<ApplicationFilterInput>;
};

export type QueryApplicationByIdArgs = {
  id: Scalars["ID"];
};

export type QueryVariableArgs = {
  id: Scalars["ID"];
};

export type QueryComponentsArgs = {
  first?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
};

export type QueryComponentByIdArgs = {
  id: Scalars["ID"];
};

export type RenameApplicationInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameApplicationPartInput = {
  applicationPartId: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameApplicationPartPayload = {
  __typename?: "RenameApplicationPartPayload";
  application?: Maybe<Application>;
  applicationPart?: Maybe<ApplicationPart>;
  query: Query;
};

export type RenameApplicationPayload = {
  __typename?: "RenameApplicationPayload";
  application?: Maybe<Application>;
  query: Query;
};

export type RenameComponentInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RenameComponentPayload = {
  __typename?: "RenameComponentPayload";
  component: Component;
  query: Query;
};

export type SaveVariableValueInput = {
  variableId: Scalars["ID"];
  value: Scalars["String"];
  valueId?: Maybe<Scalars["ID"]>;
  applicationId?: Maybe<Scalars["ID"]>;
  partId?: Maybe<Scalars["ID"]>;
  environmentId?: Maybe<Scalars["UUID"]>;
};

export type SchemaViolation = {
  __typename?: "SchemaViolation";
  path: Scalars["Any"];
  code: Scalars["String"];
};

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>;
  or?: Maybe<Array<StringOperationFilterInput>>;
  eq?: Maybe<Scalars["String"]>;
  neq?: Maybe<Scalars["String"]>;
  contains?: Maybe<Scalars["String"]>;
  ncontains?: Maybe<Scalars["String"]>;
  in?: Maybe<Array<Maybe<Scalars["String"]>>>;
  nin?: Maybe<Array<Maybe<Scalars["String"]>>>;
  startsWith?: Maybe<Scalars["String"]>;
  nstartsWith?: Maybe<Scalars["String"]>;
  endsWith?: Maybe<Scalars["String"]>;
  nendsWith?: Maybe<Scalars["String"]>;
};

export type UpdateComponentSchemaInput = {
  id: Scalars["ID"];
  schema: Scalars["String"];
};

export type UpdateComponentSchemaPayload = {
  __typename?: "UpdateComponentSchemaPayload";
  component: Component;
  query: Query;
};

export type UpdateComponentValuesInput = {
  id: Scalars["ID"];
  values?: Maybe<Scalars["Any"]>;
};

export type UpdateComponentValuesPayload = {
  __typename?: "UpdateComponentValuesPayload";
  component: Component;
  query: Query;
};

export type UpdateVariablePayload = {
  __typename?: "UpdateVariablePayload";
  variable?: Maybe<Variable>;
  query: Query;
};

export type UpdateVariableValuePayload = {
  __typename?: "UpdateVariableValuePayload";
  value?: Maybe<VariableValue>;
  query: Query;
};

export type ValueSchemaViolation = IUserError & {
  __typename?: "ValueSchemaViolation";
  violations: Array<SchemaViolation>;
  code: Scalars["String"];
  message: Scalars["String"];
};

export type Variable = Node & {
  __typename?: "Variable";
  id: Scalars["ID"];
  values?: Maybe<Array<Maybe<VariableValue>>>;
  state: VariableState;
  name: Scalars["String"];
  isSecret: Scalars["Boolean"];
  namespace?: Maybe<Scalars["String"]>;
};

export type VariableEncryptionInfo = {
  __typename?: "VariableEncryptionInfo";
  keyProvider: Scalars["String"];
  key: Scalars["String"];
  algorithm: Scalars["String"];
};

export type VariableKey = {
  __typename?: "VariableKey";
  variableId: Scalars["UUID"];
  applicationId?: Maybe<Scalars["UUID"]>;
  partId?: Maybe<Scalars["UUID"]>;
  environmentId?: Maybe<Scalars["UUID"]>;
};

export enum VariableState {
  Active = "ACTIVE",
  Deprecated = "DEPRECATED",
}

export type VariableValue = {
  __typename?: "VariableValue";
  variable?: Maybe<Variable>;
  application?: Maybe<Application>;
  part?: Maybe<ApplicationPart>;
  id: Scalars["UUID"];
  key: VariableKey;
  value: Scalars["String"];
  encryption?: Maybe<VariableEncryptionInfo>;
};

export type CreateApplicationMutationVariables = Exact<{
  input: CreateApplicationInput;
}>;

export type CreateApplicationMutation = {
  __typename?: "Mutation";
  createApplication: {
    __typename?: "CreateApplicationPayload";
    application?: Maybe<{
      __typename?: "Application";
      id: string;
      name: string;
      parts: Array<{
        __typename?: "ApplicationPart";
        id: string;
        name: string;
      }>;
    }>;
  };
};

export type AllAppsQueryVariables = Exact<{ [key: string]: never }>;

export type AllAppsQuery = {
  __typename?: "Query";
  applications?: Maybe<{
    __typename?: "ApplicationConnection";
    edges?: Maybe<
      Array<{
        __typename?: "ApplicationEdge";
        node: {
          __typename?: "Application";
          id: string;
          name: string;
          parts: Array<{
            __typename?: "ApplicationPart";
            id: string;
            name: string;
            components: Array<{
              __typename?: "ApplicationPartComponent";
              definition: {
                __typename?: "Component";
                id: string;
                name: string;
              };
            }>;
          }>;
        };
      }>
    >;
  }>;
};

export type ComponentFragment = {
  __typename?: "Component";
  id: string;
  name: string;
  state: ComponentState;
  schemaSdl?: Maybe<any>;
  schema?: Maybe<any>;
  values?: Maybe<any>;
  defaults?: Maybe<any>;
  schemaViolations: Array<{
    __typename?: "SchemaViolation";
    path: any;
    code: string;
  }>;
};

export type CreateComponentMutationVariables = Exact<{
  input: CreateComponentInput;
}>;

export type CreateComponentMutation = {
  __typename?: "Mutation";
  createComponent: {
    __typename?: "CreateComponentPayload";
    component: {
      __typename?: "Component";
      id: string;
      name: string;
      state: ComponentState;
      schemaSdl?: Maybe<any>;
      schema?: Maybe<any>;
      values?: Maybe<any>;
      defaults?: Maybe<any>;
      schemaViolations: Array<{
        __typename?: "SchemaViolation";
        path: any;
        code: string;
      }>;
    };
  };
};

export type AllComponentsQueryVariables = Exact<{ [key: string]: never }>;

export type AllComponentsQuery = {
  __typename?: "Query";
  components?: Maybe<{
    __typename?: "ComponentConnection";
    edges?: Maybe<
      Array<{
        __typename?: "ComponentEdge";
        node: {
          __typename?: "Component";
          id: string;
          name: string;
          state: ComponentState;
          schemaSdl?: Maybe<any>;
          schema?: Maybe<any>;
          values?: Maybe<any>;
          defaults?: Maybe<any>;
          schemaViolations: Array<{
            __typename?: "SchemaViolation";
            path: any;
            code: string;
          }>;
        };
      }>
    >;
  }>;
};

export type UpdateComponentSchemaMutationVariables = Exact<{
  input: UpdateComponentSchemaInput;
}>;

export type UpdateComponentSchemaMutation = {
  __typename?: "Mutation";
  updateComponentSchema: {
    __typename?: "UpdateComponentSchemaPayload";
    component: {
      __typename?: "Component";
      id: string;
      name: string;
      state: ComponentState;
      schemaSdl?: Maybe<any>;
      schema?: Maybe<any>;
      values?: Maybe<any>;
      defaults?: Maybe<any>;
      schemaViolations: Array<{
        __typename?: "SchemaViolation";
        path: any;
        code: string;
      }>;
    };
  };
};

export type UpdateComponentSchemaAndValuesMutationVariables = Exact<{
  values: UpdateComponentValuesInput;
  schema: UpdateComponentSchemaInput;
}>;

export type UpdateComponentSchemaAndValuesMutation = {
  __typename?: "Mutation";
  updateComponentSchema: {
    __typename?: "UpdateComponentSchemaPayload";
    component: {
      __typename?: "Component";
      id: string;
      name: string;
      state: ComponentState;
      schemaSdl?: Maybe<any>;
      schema?: Maybe<any>;
      values?: Maybe<any>;
      defaults?: Maybe<any>;
      schemaViolations: Array<{
        __typename?: "SchemaViolation";
        path: any;
        code: string;
      }>;
    };
  };
  updateComponentValues: {
    __typename?: "UpdateComponentValuesPayload";
    component: {
      __typename?: "Component";
      id: string;
      name: string;
      state: ComponentState;
      schemaSdl?: Maybe<any>;
      schema?: Maybe<any>;
      values?: Maybe<any>;
      defaults?: Maybe<any>;
      schemaViolations: Array<{
        __typename?: "SchemaViolation";
        path: any;
        code: string;
      }>;
    };
  };
};

export const ComponentFragmentDoc = gql`
  fragment Component on Component {
    id
    name
    state
    schemaSdl
    schema
    values
    defaults
    schemaViolations {
      path
      code
    }
  }
`;
export const CreateApplicationDocument = gql`
  mutation createApplication($input: CreateApplicationInput!) {
    createApplication(input: $input) {
      application {
        id
        name
        parts {
          id
          name
        }
      }
    }
  }
`;
export const AllAppsDocument = gql`
  query allApps {
    applications {
      edges {
        node {
          id
          name
          parts {
            id
            name
            components {
              definition {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
export const CreateComponentDocument = gql`
  mutation createComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      component {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`;
export const AllComponentsDocument = gql`
  query allComponents {
    components {
      edges {
        node {
          ...Component
        }
      }
    }
  }
  ${ComponentFragmentDoc}
`;
export const UpdateComponentSchemaDocument = gql`
  mutation updateComponentSchema($input: UpdateComponentSchemaInput!) {
    updateComponentSchema(input: $input) {
      component {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`;
export const UpdateComponentSchemaAndValuesDocument = gql`
  mutation updateComponentSchemaAndValues(
    $values: UpdateComponentValuesInput!
    $schema: UpdateComponentSchemaInput!
  ) {
    updateComponentSchema(input: $schema) {
      component {
        ...Component
      }
    }
    updateComponentValues(input: $values) {
      component {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();
const CreateApplicationDocumentString = print(CreateApplicationDocument);
const AllAppsDocumentString = print(AllAppsDocument);
const CreateComponentDocumentString = print(CreateComponentDocument);
const AllComponentsDocumentString = print(AllComponentsDocument);
const UpdateComponentSchemaDocumentString = print(
  UpdateComponentSchemaDocument
);
const UpdateComponentSchemaAndValuesDocumentString = print(
  UpdateComponentSchemaAndValuesDocument
);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    createApplication(
      variables: CreateApplicationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: CreateApplicationMutation | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateApplicationMutation>(
            CreateApplicationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "createApplication"
      );
    },
    allApps(
      variables?: AllAppsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: AllAppsQuery | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AllAppsQuery>(AllAppsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "allApps"
      );
    },
    createComponent(
      variables: CreateComponentMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: CreateComponentMutation | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreateComponentMutation>(
            CreateComponentDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "createComponent"
      );
    },
    allComponents(
      variables?: AllComponentsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: AllComponentsQuery | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AllComponentsQuery>(
            AllComponentsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "allComponents"
      );
    },
    updateComponentSchema(
      variables: UpdateComponentSchemaMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: UpdateComponentSchemaMutation | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdateComponentSchemaMutation>(
            UpdateComponentSchemaDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "updateComponentSchema"
      );
    },
    updateComponentSchemaAndValues(
      variables: UpdateComponentSchemaAndValuesMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data?: UpdateComponentSchemaAndValuesMutation | undefined;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
      errors?: GraphQLError[] | undefined;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdateComponentSchemaAndValuesMutation>(
            UpdateComponentSchemaAndValuesDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "updateComponentSchemaAndValues"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
