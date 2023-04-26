/**
 * @generated SignedSource<<9baf1135242f2bd180190ce68c8f726a>>
 * @relayHash 17d5b40c675e96a240e2bcb090028ad7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 17d5b40c675e96a240e2bcb090028ad7

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type RenameVariableInput = {
  id: string;
  name: string;
};
export type RenameVariableDialogMutation$variables = {
  input: RenameVariableInput;
};
export type RenameVariableDialogMutation$data = {
  readonly renameVariable: {
    readonly variable: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameVariableDialogMutation = {
  response: RenameVariableDialogMutation$data;
  variables: RenameVariableDialogMutation$variables;
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
        concreteType: 'RenameVariablePayload',
        kind: 'LinkedField',
        name: 'renameVariable',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Variable',
            kind: 'LinkedField',
            name: 'variable',
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
      name: 'RenameVariableDialogMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RenameVariableDialogMutation',
      selections: v1 /*: any*/,
    },
    params: {
      id: '17d5b40c675e96a240e2bcb090028ad7',
      metadata: {},
      name: 'RenameVariableDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '9ea97b861c34882cb976467c51d2aa31';

export default node;
