/**
 * @generated SignedSource<<083ec475fea34a25c4165dbb61d27210>>
 * @relayHash 165c30db38f50235a280042f06b5708b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 165c30db38f50235a280042f06b5708b

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type CreateComponentInput = {
  name: string;
  schema?: string | null;
  scopes: ReadonlyArray<ComponentScopeInput>;
  values?: any | null;
};
export type ComponentScopeInput = {
  applicationId?: string | null;
  applicationPartId?: string | null;
  namespace: string;
};
export type NewComponentMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateComponentInput;
};
export type NewComponentMutation$data = {
  readonly createComponent: {
    readonly component: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type NewComponentMutation = {
  response: NewComponentMutation$data;
  variables: NewComponentMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'connectionIds',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'input',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
      },
    ],
    v3 = {
      alias: null,
      args: null,
      concreteType: 'Component',
      kind: 'LinkedField',
      name: 'component',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'id',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'name',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    v4 = {
      kind: 'InlineFragment',
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'message',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'code',
          storageKey: null,
        },
      ],
      type: 'UserError',
      abstractKey: '__isUserError',
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'NewComponentMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'CreateComponentPayload',
          kind: 'LinkedField',
          name: 'createComponent',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'errors',
              plural: true,
              selections: [v4 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'NewComponentMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'CreateComponentPayload',
          kind: 'LinkedField',
          name: 'createComponent',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              filters: null,
              handle: 'appendNode',
              key: '',
              kind: 'LinkedHandle',
              name: 'component',
              handleArgs: [
                {
                  kind: 'Variable',
                  name: 'connections',
                  variableName: 'connectionIds',
                },
                {
                  kind: 'Literal',
                  name: 'edgeTypeName',
                  value: 'ComponentsEdge',
                },
              ],
            },
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'errors',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: '__typename',
                  storageKey: null,
                },
                v4 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '165c30db38f50235a280042f06b5708b',
      metadata: {},
      name: 'NewComponentMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '7934e5d47368728736c50a7375ee5706';

export default node;
