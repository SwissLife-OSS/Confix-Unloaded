/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_GetById_QueryVariables = {
    id: string;
};
export type EditApplicationPart_GetById_QueryResponse = {
    readonly applicationPartById: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_fragment">;
    } | null;
};
export type EditApplicationPart_GetById_Query = {
    readonly response: EditApplicationPart_GetById_QueryResponse;
    readonly variables: EditApplicationPart_GetById_QueryVariables;
};



/*
query EditApplicationPart_GetById_Query(
  $id: ID!
) {
  applicationPartById(id: $id) {
    id
    ...EditApplicationPart_fragment
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
    "name": "EditApplicationPart_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApplicationPart",
        "kind": "LinkedField",
        "name": "applicationPartById",
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditApplicationPart_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApplicationPart",
        "kind": "LinkedField",
        "name": "applicationPartById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
              (v3/*: any*/)
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
                  (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "c67711f3fb841770d1301a37f9714e18",
    "id": null,
    "metadata": {},
    "name": "EditApplicationPart_GetById_Query",
    "operationKind": "query",
    "text": "query EditApplicationPart_GetById_Query(\n  $id: ID!\n) {\n  applicationPartById(id: $id) {\n    id\n    ...EditApplicationPart_fragment\n  }\n}\n\nfragment EditApplicationPartComponent_component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n    state\n  }\n}\n\nfragment EditApplicationPart_fragment on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n    name\n  }\n  components {\n    id\n    definition {\n      id\n    }\n    ...EditApplicationPartComponent_component\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f84748042f2c749a1f8f6b1b9c19bcaf';
export default node;
