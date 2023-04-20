/**
 * @generated SignedSource<<d1654cef7840da339efedcba2b95db61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewComponent_Query$variables = {
  search?: string | null;
};
export type NewComponent_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader">;
};
export type NewComponent_Query = {
  response: NewComponent_Query$data;
  variables: NewComponent_Query$variables;
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
    "name": "NewComponent_Query",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ApplicationCascader"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewComponent_Query",
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
    "cacheID": "1dba5e0ac4778eb2824b028e63816b0d",
    "id": null,
    "metadata": {},
    "name": "NewComponent_Query",
    "operationKind": "query",
    "text": "query NewComponent_Query(\n  $search: String\n) {\n  ...ApplicationCascader_40zwac\n}\n\nfragment ApplicationCascader_40zwac on Query {\n  ...ApplicationCascader_Namespaces\n  ...ApplicationCascader_Applications_40zwac\n}\n\nfragment ApplicationCascader_Applications_40zwac on Query {\n  applications(first: 50, search: $search) {\n    edges {\n      node {\n        namespace\n        id\n        name\n        parts {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment ApplicationCascader_Namespaces on Query {\n  me {\n    namespaces\n  }\n}\n"
  }
};
})();

(node as any).hash = "64df88346d78b9c210223bba17b5a114";

export default node;
