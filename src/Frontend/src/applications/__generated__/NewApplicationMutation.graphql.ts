/**
 * @generated SignedSource<<e88094dd2e7ab9c0f9a9e75313d2bc2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateApplicationInput = {
  name: string;
  namespace: string;
  parts?: ReadonlyArray<string> | null;
};
export type NewApplicationMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateApplicationInput;
};
export type NewApplicationMutation$data = {
  readonly createApplication: {
    readonly application: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem">;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type NewApplicationMutation = {
  response: NewApplicationMutation$data;
  variables: NewApplicationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connectionIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    }
  ],
  "type": "UserError",
  "abstractKey": "__isUserError"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespace",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewApplicationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApplicationPayload",
        "kind": "LinkedField",
        "name": "createApplication",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Application",
            "kind": "LinkedField",
            "name": "application",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ApplicationsListItem"
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
              (v4/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NewApplicationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApplicationPayload",
        "kind": "LinkedField",
        "name": "createApplication",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Application",
            "kind": "LinkedField",
            "name": "application",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "parts",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPartComponent",
                    "kind": "LinkedField",
                    "name": "components",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Component",
                        "kind": "LinkedField",
                        "name": "definition",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Application",
                    "kind": "LinkedField",
                    "name": "application",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v6/*: any*/)
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
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "application",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "ApplicationsEdge"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af918b5576e5a958848488a240eeaeb7",
    "id": null,
    "metadata": {},
    "name": "NewApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation NewApplicationMutation(\n  $input: CreateApplicationInput!\n) {\n  createApplication(input: $input) {\n    application {\n      id\n      ...ApplicationsListItem\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment AddComponentsToApplicationPartDialog on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n  }\n}\n\nfragment ApplicationsListItem on Application {\n  id\n  ...ApplicationsListItem_DefaultListItem\n  ...ApplicationsListItem_SelectedListItem\n}\n\nfragment ApplicationsListItem_ApplicationPart on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n    }\n    ...ApplicationsListItem_Component\n    id\n  }\n  ...AddComponentsToApplicationPartDialog\n}\n\nfragment ApplicationsListItem_Component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n  }\n}\n\nfragment ApplicationsListItem_DefaultListItem on Application {\n  id\n  name\n  namespace\n  parts {\n    name\n    id\n  }\n}\n\nfragment ApplicationsListItem_SelectedListItem on Application {\n  id\n  name\n  namespace\n  parts {\n    id\n    ...ApplicationsListItem_ApplicationPart\n  }\n}\n"
  }
};
})();

(node as any).hash = "be1fa298934c9cf03f1c4753a0a58be1";

export default node;
