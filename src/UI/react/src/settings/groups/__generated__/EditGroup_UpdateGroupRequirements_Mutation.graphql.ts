/**
 * @generated SignedSource<<3ac86beebfa32c91d55f41fba522c802>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"EditGroup_Group">;
    } | null;
  };
};
export type EditGroup_UpdateGroupRequirements_Mutation = {
  response: EditGroup_UpdateGroupRequirements_Mutation$data;
  variables: EditGroup_UpdateGroupRequirements_Mutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "IUserError",
  "abstractKey": "__isIUserError"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditGroup_UpdateGroupRequirements_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateGroupRequirementsPayload",
        "kind": "LinkedField",
        "name": "updateGroupRequirements",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditGroup_Group"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditGroup_UpdateGroupRequirements_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateGroupRequirementsPayload",
        "kind": "LinkedField",
        "name": "updateGroupRequirements",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "requirements",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      }
                    ],
                    "type": "ClaimRequirement",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "RoleScope",
                "kind": "LinkedField",
                "name": "roles",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "namespace",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Role",
                    "kind": "LinkedField",
                    "name": "roles",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e6e7f931057843c5b808348e105177af",
    "id": null,
    "metadata": {},
    "name": "EditGroup_UpdateGroupRequirements_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditGroup_UpdateGroupRequirements_Mutation(\n  $input: UpdateGroupRequirementsInput!\n) {\n  updateGroupRequirements(input: $input) {\n    group {\n      id\n      ...EditGroup_Group\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        code\n        message\n      }\n    }\n  }\n}\n\nfragment EditGroup_Group on Group {\n  id\n  name\n  requirements {\n    __typename\n    ... on ClaimRequirement {\n      __typename\n      type\n      value\n    }\n  }\n  roles {\n    namespace\n    roles {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "88fc5852b0193778b1f1bb93df5c68ed";

export default node;
