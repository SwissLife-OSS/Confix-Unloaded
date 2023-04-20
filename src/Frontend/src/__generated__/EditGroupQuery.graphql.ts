/**
 * @generated SignedSource<<38e8c39b528ded94ef69a9b2cfd2b223>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditGroupQuery$variables = {
  id: string;
};
export type EditGroupQuery$data = {
  readonly groupById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditGroup_Form">;
  } | null;
};
export type EditGroupQuery = {
  response: EditGroupQuery$data;
  variables: EditGroupQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "groupById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditGroup_Form"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditGroupQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "groupById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                  (v3/*: any*/)
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
            "name": "requirements",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "60aaf24cb338a10057ad75dd80cb30c0",
    "id": null,
    "metadata": {},
    "name": "EditGroupQuery",
    "operationKind": "query",
    "text": "query EditGroupQuery(\n  $id: ID!\n) {\n  groupById(id: $id) {\n    id\n    ...EditGroup_Form\n  }\n}\n\nfragment EditGroup_Form on Group {\n  ...EditGroup_RoleScopeSection\n  ...EditGroup_Header\n  ...EditGroup_RequirementsSection\n}\n\nfragment EditGroup_Header on Group {\n  id\n  name\n}\n\nfragment EditGroup_RequirementsSection on Group {\n  id\n  name\n  requirements {\n    __typename\n    ... on ClaimRequirement {\n      __typename\n      type\n      value\n    }\n  }\n}\n\nfragment EditGroup_RoleScopeSection on Group {\n  id\n  name\n  roles {\n    namespace\n    roles {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "515f5b57fc6b5dd0bb8cf96c084eae6a";

export default node;
