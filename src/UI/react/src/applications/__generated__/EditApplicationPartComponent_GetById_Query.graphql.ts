/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartComponent_GetById_QueryVariables = {
    partComponentId: string;
};
export type EditApplicationPartComponent_GetById_QueryResponse = {
    readonly applicationPartComponentById: {
        readonly " $fragmentRefs": FragmentRefs<"EditApplicationPartComponent_fragment">;
    } | null;
};
export type EditApplicationPartComponent_GetById_Query = {
    readonly response: EditApplicationPartComponent_GetById_QueryResponse;
    readonly variables: EditApplicationPartComponent_GetById_QueryVariables;
};



/*
query EditApplicationPartComponent_GetById_Query(
  $partComponentId: ID!
) {
  applicationPartComponentById(partComponentId: $partComponentId) {
    ...EditApplicationPartComponent_fragment
    id
  }
}

fragment EditApplicationPartComponent_fragment on ApplicationPartComponent {
  applicationPart {
    name
    application {
      name
      namespace
      id
    }
    id
  }
  definition {
    id
    name
    state
    schemaSdl
    schema
    values
    defaults
    schemaViolations {
      path
      code
    }
  }
  values
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partComponentId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "partComponentId",
    "variableName": "partComponentId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
  "kind": "ScalarField",
  "name": "values",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationPartComponent_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApplicationPartComponent",
        "kind": "LinkedField",
        "name": "applicationPartComponentById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditApplicationPartComponent_fragment"
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
    "name": "EditApplicationPartComponent_GetById_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApplicationPartComponent",
        "kind": "LinkedField",
        "name": "applicationPartComponentById",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Component",
            "kind": "LinkedField",
            "name": "definition",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
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
                "kind": "ScalarField",
                "name": "schemaSdl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "schema",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "defaults",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SchemaViolation",
                "kind": "LinkedField",
                "name": "schemaViolations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "path",
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
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "20414f07920cb9d429c97762f652cb23",
    "id": null,
    "metadata": {},
    "name": "EditApplicationPartComponent_GetById_Query",
    "operationKind": "query",
    "text": "query EditApplicationPartComponent_GetById_Query(\n  $partComponentId: ID!\n) {\n  applicationPartComponentById(partComponentId: $partComponentId) {\n    ...EditApplicationPartComponent_fragment\n    id\n  }\n}\n\nfragment EditApplicationPartComponent_fragment on ApplicationPartComponent {\n  applicationPart {\n    name\n    application {\n      name\n      namespace\n      id\n    }\n    id\n  }\n  definition {\n    id\n    name\n    state\n    schemaSdl\n    schema\n    values\n    defaults\n    schemaViolations {\n      path\n      code\n    }\n  }\n  values\n}\n"
  }
};
})();
(node as any).hash = '34ac4687a3cadea83f1d15f9c7c313ad';
export default node;
