/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditVariableQueryVariables = {
    id: string;
};
export type EditVariableQueryResponse = {
    readonly variable: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EditVariable_Variable">;
    };
};
export type EditVariableQuery = {
    readonly response: EditVariableQueryResponse;
    readonly variables: EditVariableQueryVariables;
};



/*
query EditVariableQuery(
  $id: ID!
) {
  variable(id: $id) {
    id
    ...EditVariable_Variable
  }
}

fragment EditVariable_Variable on Variable {
  id
  name
  namespace
  isSecret
  state
  values {
    application {
      id
    }
    applicationPart {
      id
    }
    id
    value
    encryption {
      keyProvider
      key
      algorithm
    }
  }
}
*/

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
v3 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditVariableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Variable",
        "kind": "LinkedField",
        "name": "variable",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditVariable_Variable"
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
    "name": "EditVariableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Variable",
        "kind": "LinkedField",
        "name": "variable",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "isSecret",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "VariableValue",
            "kind": "LinkedField",
            "name": "values",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "application",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "applicationPart",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "VariableEncryptionInfo",
                "kind": "LinkedField",
                "name": "encryption",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "keyProvider",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "key",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "algorithm",
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
    "cacheID": "62cae485fcdebd825ab0165e9e6fc290",
    "id": null,
    "metadata": {},
    "name": "EditVariableQuery",
    "operationKind": "query",
    "text": "query EditVariableQuery(\n  $id: ID!\n) {\n  variable(id: $id) {\n    id\n    ...EditVariable_Variable\n  }\n}\n\nfragment EditVariable_Variable on Variable {\n  id\n  name\n  namespace\n  isSecret\n  state\n  values {\n    application {\n      id\n    }\n    applicationPart {\n      id\n    }\n    id\n    value\n    encryption {\n      keyProvider\n      key\n      algorithm\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '38837be259c52dc88c6a02d558b61b48';
export default node;
