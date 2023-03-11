/**
 * @generated SignedSource<<7c3a925479292b6b0b65ea233c582619>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeComponentScopeDialog_Query$variables = {
  search?: string | null;
};
export type ChangeComponentScopeDialog_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Data">;
};
export type ChangeComponentScopeDialog_Query = {
  response: ChangeComponentScopeDialog_Query$data;
  variables: ChangeComponentScopeDialog_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "search"
},
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
    "name": "ChangeComponentScopeDialog_Query",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ApplicationCascader_Data"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeComponentScopeDialog_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "namespaces",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 50
          },
          (v1/*: any*/)
        ],
        "concreteType": "ApplicationsConnection",
        "kind": "LinkedField",
        "name": "applications",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "namespace",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "parts",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
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
      }
    ]
  },
  "params": {
    "cacheID": "bd5d6edcc09712d949a121e0c130f33d",
    "id": null,
    "metadata": {},
    "name": "ChangeComponentScopeDialog_Query",
    "operationKind": "query",
    "text": "query ChangeComponentScopeDialog_Query(\n  $search: String\n) {\n  ...ApplicationCascader_Data_40zwac\n}\n\nfragment ApplicationCascader_Applications_40zwac on Query {\n  applications(first: 50, search: $search) {\n    edges {\n      node {\n        namespace\n        id\n        name\n        parts {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment ApplicationCascader_Data_40zwac on Query {\n  ...ApplicationCascader_Namespaces\n  ...ApplicationCascader_Applications_40zwac\n}\n\nfragment ApplicationCascader_Namespaces on Query {\n  me {\n    namespaces\n  }\n}\n"
  }
};
})();

(node as any).hash = "615d9b81e3e36a07c09eb273f0b5ab90";

export default node;
