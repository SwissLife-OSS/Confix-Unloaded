/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RemoveEnvironmentByIdInput = {
    id: string;
};
export type RemoveEnvironmentDialogMutationVariables = {
    input: RemoveEnvironmentByIdInput;
    connectionIds: Array<string>;
};
export type RemoveEnvironmentDialogMutationResponse = {
    readonly removeEnvironmentById: {
        readonly environment: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EnvironmentsList_EnvironmentEdge">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly __typename: string;
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type RemoveEnvironmentDialogMutation = {
    readonly response: RemoveEnvironmentDialogMutationResponse;
    readonly variables: RemoveEnvironmentDialogMutationVariables;
};



/*
mutation RemoveEnvironmentDialogMutation(
  $input: RemoveEnvironmentByIdInput!
) {
  removeEnvironmentById(input: $input) {
    environment {
      id
      ...EnvironmentsList_EnvironmentEdge
    }
    errors {
      __typename
      ... on IUserError {
        __isIUserError: __typename
        message
        code
      }
    }
  }
}

fragment EnvironmentsList_EnvironmentEdge on Environment {
  id
  name
}
*/

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
    {
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
      "type": "IUserError",
      "abstractKey": "__isIUserError"
    }
  ],
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
    "name": "RemoveEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveEnvironmentByIdPayload",
        "kind": "LinkedField",
        "name": "removeEnvironmentById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environment",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EnvironmentsList_EnvironmentEdge"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
    "name": "RemoveEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveEnvironmentByIdPayload",
        "kind": "LinkedField",
        "name": "removeEnvironmentById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environment",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connectionIds"
                  }
                ]
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "467b59ba18f6c97a442dc795aef3e580",
    "id": null,
    "metadata": {},
    "name": "RemoveEnvironmentDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveEnvironmentDialogMutation(\n  $input: RemoveEnvironmentByIdInput!\n) {\n  removeEnvironmentById(input: $input) {\n    environment {\n      id\n      ...EnvironmentsList_EnvironmentEdge\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment EnvironmentsList_EnvironmentEdge on Environment {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = 'b07061a0412ec56378d174371e170163';
export default node;
