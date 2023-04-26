/**
 * @generated SignedSource<<4ba2d285328334f19f0f0e2936947260>>
 * @relayHash e5577e1f6bd787d665f4f37ab4f29bcf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e5577e1f6bd787d665f4f37ab4f29bcf

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type PublishApplicationPartByIdInput = {
  applicationPartId: string;
};
export type PublishApplicationPartDialogMutation$variables = {
  input: PublishApplicationPartByIdInput;
};
export type PublishApplicationPartDialogMutation$data = {
  readonly publishApplicationPartById: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly publishedApplicationPart: {
      readonly id: string;
      readonly version: number;
    } | null;
  };
};
export type PublishApplicationPartDialogMutation = {
  response: PublishApplicationPartDialogMutation$data;
  variables: PublishApplicationPartDialogMutation$variables;
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
        concreteType: 'PublishApplicationPartByIdPayload',
        kind: 'LinkedField',
        name: 'publishApplicationPartById',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'PublishedApplicationPart',
            kind: 'LinkedField',
            name: 'publishedApplicationPart',
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
                name: 'version',
                storageKey: null,
              },
            ],
            storageKey: null,
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
              {
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
      name: 'PublishApplicationPartDialogMutation',
      selections: v1 /*: any*/,
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'PublishApplicationPartDialogMutation',
      selections: v1 /*: any*/,
    },
    params: {
      id: 'e5577e1f6bd787d665f4f37ab4f29bcf',
      metadata: {},
      name: 'PublishApplicationPartDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '488def53c17799a8c21008264ce3ef1f';

export default node;
