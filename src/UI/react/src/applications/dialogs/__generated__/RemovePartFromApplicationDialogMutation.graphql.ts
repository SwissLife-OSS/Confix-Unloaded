/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RemoveApplicationPartInput = {
    applicationPartId: string;
};
export type RemovePartFromApplicationDialogMutationVariables = {
    input: RemoveApplicationPartInput;
};
export type RemovePartFromApplicationDialogMutationResponse = {
    readonly removeApplicationPart: {
        readonly application: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"ApplicationsList_applicationsEdge" | "EditApplication_Application_Fragment">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly __typename: string;
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type RemovePartFromApplicationDialogMutation = {
    readonly response: RemovePartFromApplicationDialogMutationResponse;
    readonly variables: RemovePartFromApplicationDialogMutationVariables;
};



/*
mutation RemovePartFromApplicationDialogMutation(
  $input: RemoveApplicationPartInput!
) {
  removeApplicationPart(input: $input) {
    application {
      id
      ...ApplicationsList_applicationsEdge
      ...EditApplication_Application_Fragment
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

fragment ApplicationPartSectionHeaderFragment on Application {
  id
  name
}

fragment ApplicationsList_applicationsEdge on Application {
  id
  name
  namespace
  parts {
    id
    name
    components {
      id
      definition {
        id
        name
      }
    }
  }
}

fragment EditApplication_Application_Fragment on Application {
  id
  name
  namespace
  parts {
    ...EditApplication_part
    id
  }
  ...ApplicationPartSectionHeaderFragment
}

fragment EditApplication_part on ApplicationPart {
  id
  name
  components {
    definition {
      id
      name
      state
    }
    id
  }
}
*/

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
},
v4 = {
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
    "name": "RemovePartFromApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeApplicationPart",
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ApplicationsList_applicationsEdge"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApplication_Application_Fragment"
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
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
    "name": "RemovePartFromApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeApplicationPart",
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
              (v2/*: any*/),
              (v4/*: any*/),
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
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "parts",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPartComponent",
                    "kind": "LinkedField",
                    "name": "components",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Component",
                        "kind": "LinkedField",
                        "name": "definition",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "state",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2750d0ae4cbf8fc539605942713b19f3",
    "id": null,
    "metadata": {},
    "name": "RemovePartFromApplicationDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RemovePartFromApplicationDialogMutation(\n  $input: RemoveApplicationPartInput!\n) {\n  removeApplicationPart(input: $input) {\n    application {\n      id\n      ...ApplicationsList_applicationsEdge\n      ...EditApplication_Application_Fragment\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment ApplicationPartSectionHeaderFragment on Application {\n  id\n  name\n}\n\nfragment ApplicationsList_applicationsEdge on Application {\n  id\n  name\n  namespace\n  parts {\n    id\n    name\n    components {\n      id\n      definition {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment EditApplication_Application_Fragment on Application {\n  id\n  name\n  namespace\n  parts {\n    ...EditApplication_part\n    id\n  }\n  ...ApplicationPartSectionHeaderFragment\n}\n\nfragment EditApplication_part on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n      name\n      state\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f9d11049b0f783d92ddcc3462e18b2cb';
export default node;
