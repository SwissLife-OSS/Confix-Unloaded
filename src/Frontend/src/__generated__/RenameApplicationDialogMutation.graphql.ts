/**
 * @generated SignedSource<<e2e42fdc284ad29273f0c54d798bb59c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RenameApplicationInput = {
  id: string;
  name: string;
};
export type RenameApplicationDialogMutation$variables = {
  input: RenameApplicationInput;
};
export type RenameApplicationDialogMutation$data = {
  readonly renameApplication: {
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
export type RenameApplicationDialogMutation = {
  response: RenameApplicationDialogMutation$data;
  variables: RenameApplicationDialogMutation$variables;
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
  "name": "namespace",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RenameApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPayload",
        "kind": "LinkedField",
        "name": "renameApplication",
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
    "name": "RenameApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPayload",
        "kind": "LinkedField",
        "name": "renameApplication",
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
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "parts",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v2/*: any*/),
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
                          (v2/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                      (v2/*: any*/),
                      (v5/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
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
    "cacheID": "fcf304dad48732491f505c7b75182e0e",
    "id": null,
    "metadata": {},
    "name": "RenameApplicationDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameApplicationDialogMutation(\n  $input: RenameApplicationInput!\n) {\n  renameApplication(input: $input) {\n    application {\n      id\n      ...ApplicationsListItem\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment AddComponentsToApplicationPartDialog on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n  }\n}\n\nfragment ApplicationsListItem on Application {\n  id\n  ...ApplicationsListItem_DefaultListItem\n  ...ApplicationsListItem_SelectedListItem\n}\n\nfragment ApplicationsListItem_ApplicationPart on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n    }\n    ...ApplicationsListItem_Component\n    id\n  }\n  ...AddComponentsToApplicationPartDialog\n}\n\nfragment ApplicationsListItem_Component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n  }\n}\n\nfragment ApplicationsListItem_DefaultListItem on Application {\n  id\n  name\n  namespace\n  parts {\n    name\n    id\n  }\n}\n\nfragment ApplicationsListItem_SelectedListItem on Application {\n  id\n  name\n  namespace\n  parts {\n    id\n    ...ApplicationsListItem_ApplicationPart\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f061c3b1f10f707f85c2e432ccc6798";

export default node;
