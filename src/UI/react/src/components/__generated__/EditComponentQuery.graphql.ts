/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditComponentQueryVariables = {
    id: string;
};
export type EditComponentQueryResponse = {
    readonly componentById: {
        readonly id: string;
        readonly name: string;
        readonly " $fragmentRefs": FragmentRefs<"EditComponent_component">;
    } | null;
};
export type EditComponentQuery = {
    readonly response: EditComponentQueryResponse;
    readonly variables: EditComponentQueryVariables;
};



/*
query EditComponentQuery(
  $id: ID!
) {
  componentById(id: $id) {
    id
    name
    ...EditComponent_component
  }
}

fragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {
  addedComponent {
    definition {
      name
      id
    }
    id
  }
}

fragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {
  addedPart {
    name
    id
  }
}

fragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {
  part {
    id
  }
  application {
    id
  }
  partComponent {
    id
    version
  }
  partComponentVersion
}

fragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {
  kind
}

fragment ChangeLog_ComponentValuesChange on ComponentValuesChange {
  kind
}

fragment ChangeLog_CreateComponentChange on CreateComponentChange {
  component {
    name
    id
  }
}

fragment ChangeLog_CreateVariableChange on CreateVariableChange {
  variable {
    name
    id
  }
}

fragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {
  variable {
    name
    id
  }
}

fragment ChangeLog_RemoveComponentChange on RemoveComponentChange {
  component {
    name
    id
  }
}

fragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {
  removedComponent {
    definition {
      name
      id
    }
    id
  }
}

fragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {
  removedPart {
    name
    id
  }
}

fragment ChangeLog_RenameApplicationChange on RenameApplicationChange {
  name
}

fragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {
  name
}

fragment ChangeLog_RenameComponentChange on RenameComponentChange {
  component {
    name
    id
  }
}

fragment ChangeLog_RenameVariableChange on RenameVariableChange {
  variable {
    name
    id
  }
}

fragment ChangeLog_VariableValueChange on VariableValueChange {
  variable {
    name
    id
  }
}

fragment ChangeLog_fragment on ChangeLog {
  id
  change {
    kind
    __typename
    ...ChangeLog_RenameApplicationChange
    ...ChangeLog_RenameApplicationPartChange
    ...ChangeLog_AddComponentToApplicationPartChange
    ...ChangeLog_AddPartToApplicationChange
    ...ChangeLog_RemoveComponentFromApplicationPartChange
    ...ChangeLog_RemovePartFromApplicationChange
    ...ChangeLog_ApplicationPartComponentValuesChange
    ...ChangeLog_ComponentSchemaChange
    ...ChangeLog_ComponentValuesChange
    ...ChangeLog_CreateComponentChange
    ...ChangeLog_RemoveComponentChange
    ...ChangeLog_RenameComponentChange
    ...ChangeLog_CreateVariableChange
    ...ChangeLog_DeleteVariableValueChange
    ...ChangeLog_RenameVariableChange
    ...ChangeLog_VariableValueChange
  }
  modifiedAt
  modifiedBy {
    email
  }
}

fragment EditComponent_component on Component {
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
  changeLog {
    ...ChangeLog_fragment
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
},
v4 = [
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v6 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v7 = [
  (v2/*: any*/)
],
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  }
],
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditComponent_component"
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
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "values",
            "storageKey": null
          },
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ChangeLog",
            "kind": "LinkedField",
            "name": "changeLog",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "change",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "kind",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v4/*: any*/),
                    "type": "RenameApplicationChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v4/*: any*/),
                    "type": "RenameApplicationPartChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPartComponent",
                        "kind": "LinkedField",
                        "name": "addedComponent",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AddComponentToApplicationPartChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "addedPart",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "AddPartToApplicationChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPartComponent",
                        "kind": "LinkedField",
                        "name": "removedComponent",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "RemoveComponentFromApplicationPartChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "removedPart",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "RemovePartFromApplicationChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "part",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Application",
                        "kind": "LinkedField",
                        "name": "application",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPartComponent",
                        "kind": "LinkedField",
                        "name": "partComponent",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "version",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "partComponentVersion",
                        "storageKey": null
                      }
                    ],
                    "type": "ApplicationPartComponentValuesChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v8/*: any*/),
                    "type": "CreateComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v8/*: any*/),
                    "type": "RemoveComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v8/*: any*/),
                    "type": "RenameComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "CreateVariableChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "DeleteVariableValueChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "RenameVariableChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "VariableValueChange",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "modifiedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserInfo",
                "kind": "LinkedField",
                "name": "modifiedBy",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
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
    "cacheID": "b225ab77b3bc489d6f14706786ff4824",
    "id": null,
    "metadata": {},
    "name": "EditComponentQuery",
    "operationKind": "query",
    "text": "query EditComponentQuery(\n  $id: ID!\n) {\n  componentById(id: $id) {\n    id\n    name\n    ...EditComponent_component\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment EditComponent_component on Component {\n  id\n  name\n  state\n  schemaSdl\n  schema\n  values\n  defaults\n  schemaViolations {\n    path\n    code\n  }\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '70b7bd96c79d3dd86a348633a428e65d';
export default node;
