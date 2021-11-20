/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplication_GetById_QueryVariables = {
    id: string;
};
export type EditApplication_GetById_QueryResponse = {
    readonly applicationById: {
        readonly " $fragmentRefs": FragmentRefs<"EditApplication_Application_Fragment">;
    } | null;
};
export type EditApplication_GetById_Query = {
    readonly response: EditApplication_GetById_QueryResponse;
    readonly variables: EditApplication_GetById_QueryVariables;
};



/*
query EditApplication_GetById_Query(
  $id: ID!
) {
  applicationById(id: $id) {
    ...EditApplication_Application_Fragment
    id
  }
}

fragment ApplicationPartSectionHeaderFragment on Application {
  id
  name
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
    "name": "EditApplication_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "applicationById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditApplication_Application_Fragment"
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
    "name": "EditApplication_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "applicationById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                  },
                  (v2/*: any*/)
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
    "cacheID": "af4e5bcb6f6f56c33efe2a4c3a98cf0d",
    "id": null,
    "metadata": {},
    "name": "EditApplication_GetById_Query",
    "operationKind": "query",
    "text": "query EditApplication_GetById_Query(\n  $id: ID!\n) {\n  applicationById(id: $id) {\n    ...EditApplication_Application_Fragment\n    id\n  }\n}\n\nfragment ApplicationPartSectionHeaderFragment on Application {\n  id\n  name\n}\n\nfragment EditApplication_Application_Fragment on Application {\n  id\n  name\n  namespace\n  parts {\n    ...EditApplication_part\n    id\n  }\n  ...ApplicationPartSectionHeaderFragment\n}\n\nfragment EditApplication_part on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n      name\n      state\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ce7a2f3c9cb3683d80bf668d766ac4c2';
export default node;
