/**
 * @generated SignedSource<<13c7c3a114a979c48223346199cf9582>>
 * @relayHash 12048afc12af5fcebc78edf925f4d375
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 12048afc12af5fcebc78edf925f4d375

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type RenameEnvironmentInput = {
  id: string;
  name: string;
};
export type RenameEnvironmentDialogMutation$variables = {
  input: RenameEnvironmentInput;
};
export type RenameEnvironmentDialogMutation$data = {
  readonly renameEnvironment: {
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameEnvironmentDialogMutation = {
  response: RenameEnvironmentDialogMutation$data;
  variables: RenameEnvironmentDialogMutation$variables;
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
        concreteType: 'RenameEnvironmentPayload',
        kind: 'LinkedField',
        name: 'renameEnvironment',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Environment',
            kind: 'LinkedField',
            name: 'environment',
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
      name: 'RenameEnvironmentDialogMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RenameEnvironmentDialogMutation',
      selections: v1 /*: any*/,
    },
    params: {
      id: '12048afc12af5fcebc78edf925f4d375',
      metadata: {},
      name: 'RenameEnvironmentDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '513ba7bef3770542943aa990aa89d2f7';

export default node;
