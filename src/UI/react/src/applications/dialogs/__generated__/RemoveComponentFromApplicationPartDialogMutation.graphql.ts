/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RemoveComponentFromApplicationPartInput = {
    partComponentId: string;
};
export type RemoveComponentFromApplicationPartDialogMutationVariables = {
    input: RemoveComponentFromApplicationPartInput;
};
export type RemoveComponentFromApplicationPartDialogMutationResponse = {
    readonly removeComponentFromApplicationPart: {
        readonly applicationPart: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_fragment">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly __typename: string;
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type RemoveComponentFromApplicationPartDialogMutation = {
    readonly response: RemoveComponentFromApplicationPartDialogMutationResponse;
    readonly variables: RemoveComponentFromApplicationPartDialogMutationVariables;
};



/*
mutation RemoveComponentFromApplicationPartDialogMutation(
  $input: RemoveComponentFromApplicationPartInput!
) {
  removeComponentFromApplicationPart(input: $input) {
    applicationPart {
      id
      ...EditApplicationPart_fragment
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

fragment EditApplicationPartComponent_component on ApplicationPartComponent {
  id
  definition {
    id
    name
    state
  }
}

fragment EditApplicationPart_fragment on ApplicationPart {
  id
  name
  application {
    id
    namespace
    name
  }
  components {
    id
    definition {
      id
    }
    ...EditApplicationPartComponent_component
  }
  variableValues {
    ...VariableValueList_values
    id
  }
}

fragment VariableValueList_values on VariableValue {
  id
  environment {
    id
    name
  }
  variable {
    id
    name
  }
  value
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
},
v5 = [
  (v2/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveComponentFromApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeComponentFromApplicationPart",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPart",
            "kind": "LinkedField",
            "name": "applicationPart",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApplicationPart_fragment"
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
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveComponentFromApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeComponentFromApplicationPart",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPart",
            "kind": "LinkedField",
            "name": "applicationPart",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "namespace",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "VariableValue",
                "kind": "LinkedField",
                "name": "variableValues",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Environment",
                    "kind": "LinkedField",
                    "name": "environment",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Variable",
                    "kind": "LinkedField",
                    "name": "variable",
                    "plural": false,
                    "selections": (v5/*: any*/),
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
    "cacheID": "9fbe0838a74e2e20ad06bd56d5dae1f9",
    "id": null,
    "metadata": {},
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveComponentFromApplicationPartDialogMutation(\n  $input: RemoveComponentFromApplicationPartInput!\n) {\n  removeComponentFromApplicationPart(input: $input) {\n    applicationPart {\n      id\n      ...EditApplicationPart_fragment\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment EditApplicationPartComponent_component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n    state\n  }\n}\n\nfragment EditApplicationPart_fragment on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n    name\n  }\n  components {\n    id\n    definition {\n      id\n    }\n    ...EditApplicationPartComponent_component\n  }\n  variableValues {\n    ...VariableValueList_values\n    id\n  }\n}\n\nfragment VariableValueList_values on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();
(node as any).hash = 'a785e9aa48cf282d70c074978b753319';
export default node;
