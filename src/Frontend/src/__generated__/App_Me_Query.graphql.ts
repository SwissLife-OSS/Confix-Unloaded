/**
 * @generated SignedSource<<1e99b1e258b0bd3f2768b8628171ecfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type App_Me_Query$variables = {};
export type App_Me_Query$data = {
  readonly me: {
    readonly name: string;
  } | null;
};
export type App_Me_Query = {
  response: App_Me_Query$data;
  variables: App_Me_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "App_Me_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "App_Me_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b2a03822b03c44868fefa2c713a14fae",
    "id": null,
    "metadata": {},
    "name": "App_Me_Query",
    "operationKind": "query",
    "text": "query App_Me_Query {\n  me {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "8494f5c64ac46653bb51579d213489d8";

export default node;
