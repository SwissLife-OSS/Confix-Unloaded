/**
 * @generated SignedSource<<6ff0a62a98f659b2c9c892deea67416a>>
 * @relayHash b9c33abe9bcfbb204f23206b0e83886d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b9c33abe9bcfbb204f23206b0e83886d

import {ConcreteRequest, Mutation} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type UpdateGroupRequirementsInput = {
  id: string;
  requirements: ReadonlyArray<RequirementInput>;
};
export type RequirementInput = {
  claimRequirement?: ClaimRequirementInput | null;
};
export type ClaimRequirementInput = {
  type: string;
  value: string;
};
export type EditGroup_UpdateGroupRequirements_Mutation$variables = {
  input: UpdateGroupRequirementsInput;
};
export type EditGroup_UpdateGroupRequirements_Mutation$data = {
  readonly updateGroupRequirements: {
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly group: {
      readonly id: string;
      readonly ' $fragmentSpreads': FragmentRefs<'EditGroup_RequirementsSection'>;
    } | null;
  };
};
export type EditGroup_UpdateGroupRequirements_Mutation = {
  response: EditGroup_UpdateGroupRequirements_Mutation$data;
  variables: EditGroup_UpdateGroupRequirements_Mutation$variables;
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
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
      kind: 'InlineFragment',
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'code',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'message',
          storageKey: null,
        },
      ],
      type: 'UserError',
      abstractKey: '__isUserError',
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditGroup_UpdateGroupRequirements_Mutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'UpdateGroupRequirementsPayload',
          kind: 'LinkedField',
          name: 'updateGroupRequirements',
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
                v2 /*: any*/,
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'EditGroup_RequirementsSection',
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
              selections: [v3 /*: any*/],
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditGroup_UpdateGroupRequirements_Mutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'UpdateGroupRequirementsPayload',
          kind: 'LinkedField',
          name: 'updateGroupRequirements',
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
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'name',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'requirements',
                  plural: true,
                  selections: [
                    v4 /*: any*/,
                    {
                      kind: 'InlineFragment',
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'type',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'value',
                          storageKey: null,
                        },
                      ],
                      type: 'ClaimRequirement',
                      abstractKey: null,
                    },
                  ],
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
              selections: [v4 /*: any*/, v3 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: 'b9c33abe9bcfbb204f23206b0e83886d',
      metadata: {},
      name: 'EditGroup_UpdateGroupRequirements_Mutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '2cfcad3cfc60c83e4e552496baf99c53';

export default node;
