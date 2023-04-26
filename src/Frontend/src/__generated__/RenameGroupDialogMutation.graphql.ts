/**
 * @generated SignedSource<<180532e128366d1ee3b23572b8c9c245>>
 * @relayHash 779c8a2d3bf75c505370dcd889dd863b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 779c8a2d3bf75c505370dcd889dd863b

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type RenameGroupInput = {
  id: string;
  name: string;
};
export type RenameGroupDialogMutation$variables = {
  input: RenameGroupInput;
};
export type RenameGroupDialogMutation$data = {
  readonly renameGroup: {
    readonly group: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameGroupDialogMutation = {
  response: RenameGroupDialogMutation$data;
  variables: RenameGroupDialogMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'RenameGroupPayload',
        kind: 'LinkedField',
        name: 'renameGroup',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Group',
            kind: 'LinkedField',
            name: 'group',
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
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'RenameGroupDialogMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RenameGroupDialogMutation',
      selections: v1 /*: any*/,
    },
    params: {
      id: '779c8a2d3bf75c505370dcd889dd863b',
      metadata: {},
      name: 'RenameGroupDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '182ad7182cf6185bfa2d8d18dcc4169f';

export default node;
