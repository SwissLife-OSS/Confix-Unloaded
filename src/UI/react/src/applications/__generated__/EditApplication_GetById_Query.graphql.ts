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

fragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {
  partVersion
  part {
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
    ...ChangeLog_PublishedApplicationPartChange
  }
  modifiedAt
  modifiedBy {
    email
  }
}

fragment EditApplication_Application_Fragment on Application {
  id
  name
  namespace
  parts {
    ...EditApplication_part
    id
  }
  ...EditApplication_VariableValues_Fragment @defer(label: "EditApplication_Application_Fragment$defer$EditApplication_VariableValues_Fragment")
  ...EditApplication_ChangeLog_Fragment @defer(label: "EditApplication_Application_Fragment$defer$EditApplication_ChangeLog_Fragment")
  ...ApplicationPartSectionHeaderFragment
}

fragment EditApplication_ChangeLog_Fragment on Application {
  changeLog {
    ...ChangeLog_fragment
    id
  }
}

fragment EditApplication_VariableValues_Fragment on Application {
  variableValues {
    ...VariableValueList_values
    id
  }
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
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/)
],
v6 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v8 = [
  (v2/*: any*/)
],
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  }
],
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  }
];
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
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplication_Application_Fragment$defer$EditApplication_VariableValues_Fragment",
            "selections": [
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
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Variable",
                    "kind": "LinkedField",
                    "name": "variable",
                    "plural": false,
                    "selections": (v4/*: any*/),
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
            ]
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplication_Application_Fragment$defer$EditApplication_ChangeLog_Fragment",
            "selections": [
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
                        "selections": (v5/*: any*/),
                        "type": "RenameApplicationChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v6/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v6/*: any*/),
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
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Application",
                            "kind": "LinkedField",
                            "name": "application",
                            "plural": false,
                            "selections": (v8/*: any*/),
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
                        "selections": (v9/*: any*/),
                        "type": "CreateComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "RemoveComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "RenameComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "CreateVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "DeleteVariableValueChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "RenameVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "VariableValueChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "partVersion",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ApplicationPart",
                            "kind": "LinkedField",
                            "name": "part",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "PublishedApplicationPartChange",
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
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f26a9499a7916c8d166714432ecf08d4",
    "id": null,
    "metadata": {},
    "name": "EditApplication_GetById_Query",
    "operationKind": "query",
    "text": "query EditApplication_GetById_Query(\n  $id: ID!\n) {\n  applicationById(id: $id) {\n    ...EditApplication_Application_Fragment\n    id\n  }\n}\n\nfragment ApplicationPartSectionHeaderFragment on Application {\n  id\n  name\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment EditApplication_Application_Fragment on Application {\n  id\n  name\n  namespace\n  parts {\n    ...EditApplication_part\n    id\n  }\n  ...EditApplication_VariableValues_Fragment @defer(label: \"EditApplication_Application_Fragment$defer$EditApplication_VariableValues_Fragment\")\n  ...EditApplication_ChangeLog_Fragment @defer(label: \"EditApplication_Application_Fragment$defer$EditApplication_ChangeLog_Fragment\")\n  ...ApplicationPartSectionHeaderFragment\n}\n\nfragment EditApplication_ChangeLog_Fragment on Application {\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n\nfragment EditApplication_VariableValues_Fragment on Application {\n  variableValues {\n    ...VariableValueList_values\n    id\n  }\n}\n\nfragment EditApplication_part on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n      name\n      state\n    }\n    id\n  }\n}\n\nfragment VariableValueList_values on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();
(node as any).hash = 'ce7a2f3c9cb3683d80bf668d766ac4c2';
export default node;
