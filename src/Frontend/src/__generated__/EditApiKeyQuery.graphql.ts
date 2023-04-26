/**
 * @generated SignedSource<<2e85d88bf2598c893792f4fadb5e374b>>
 * @relayHash 1592c6401b8e3fedfd70775a382d1ea6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1592c6401b8e3fedfd70775a382d1ea6

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApiKeyQuery$variables = {
  id: string;
};
export type EditApiKeyQuery$data = {
  readonly apiKeyById: {
    readonly id: string;
    readonly ' $fragmentSpreads': FragmentRefs<'EditApiKey_Form'>;
  } | null;
};
export type EditApiKeyQuery = {
  response: EditApiKeyQuery$data;
  variables: EditApiKeyQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'id',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditApiKeyQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ApiKey',
          kind: 'LinkedField',
          name: 'apiKeyById',
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'EditApiKey_Form',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditApiKeyQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ApiKey',
          kind: 'LinkedField',
          name: 'apiKeyById',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'RoleScope',
              kind: 'LinkedField',
              name: 'roles',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'namespace',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: 'Role',
                  kind: 'LinkedField',
                  name: 'roles',
                  plural: true,
                  selections: [v2 /*: any*/, v3 /*: any*/],
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '1592c6401b8e3fedfd70775a382d1ea6',
      metadata: {},
      name: 'EditApiKeyQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '00e32057b083c99770b139a12f856adc';

export default node;
