/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type UpdateApplicationPartComponentValuesInput = {
    partComponentId: string;
    values?: object | null | undefined;
};
export type EditApplicationPartComponent_UpdateComponentValues_MutationVariables = {
    input: UpdateApplicationPartComponentValuesInput;
};
export type EditApplicationPartComponent_UpdateComponentValues_MutationResponse = {
    readonly updateApplicationPartComponentValues: {
        readonly component: {
            readonly " $fragmentRefs": FragmentRefs<"EditApplicationPartComponent_fragment">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type EditApplicationPartComponent_UpdateComponentValues_Mutation = {
    readonly response: EditApplicationPartComponent_UpdateComponentValues_MutationResponse;
    readonly variables: EditApplicationPartComponent_UpdateComponentValues_MutationVariables;
};



/*
mutation EditApplicationPartComponent_UpdateComponentValues_Mutation(
  $input: UpdateApplicationPartComponentValuesInput!
) {
  updateApplicationPartComponentValues(input: $input) {
    component {
      ...EditApplicationPartComponent_fragment
      id
    }
    errors {
      __typename
      ... on IUserError {
        __isIUserError: __typename
        message
        code
      }
    }
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
  }
  modifiedAt
  modifiedBy {
    email
  }
}

fragment EditApplicationPartComponent_ChangeLog_Fragment on ApplicationPartComponent {
  changeLog {
    ...ChangeLog_fragment
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
      variableValues {
        variable {
          name
          id
        }
        id
      }
    }
    variableValues {
      variable {
        name
        id
      }
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
  version
  values
  ...EditApplicationPartComponent_ChangeLog_Fragment @defer(label: "EditApplicationPartComponent_fragment$defer$EditApplicationPartComponent_ChangeLog_Fragment")
}
*/

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
  "name": "code",
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
    (v2/*: any*/)
  ],
  "type": "IUserError",
  "abstractKey": "__isIUserError"
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
  "name": "id",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableValue",
  "kind": "LinkedField",
  "name": "variableValues",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": (v6/*: any*/),
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "values",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = [
  (v4/*: any*/)
],
v12 = [
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
  (v5/*: any*/)
],
v13 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApplicationPartComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateApplicationPartComponentValues",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPartComponent",
            "kind": "LinkedField",
            "name": "component",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApplicationPartComponent_fragment"
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
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApplicationPartComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateApplicationPartComponentValues",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPartComponent",
            "kind": "LinkedField",
            "name": "component",
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Application",
                    "kind": "LinkedField",
                    "name": "application",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "namespace",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v5/*: any*/)
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
                  (v5/*: any*/),
                  (v4/*: any*/),
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
                  (v8/*: any*/),
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v8/*: any*/),
              (v5/*: any*/),
              {
                "if": null,
                "kind": "Defer",
                "label": "EditApplicationPartComponent_fragment$defer$EditApplicationPartComponent_ChangeLog_Fragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ChangeLog",
                    "kind": "LinkedField",
                    "name": "changeLog",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
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
                          (v10/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "RenameApplicationChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
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
                                "selections": (v12/*: any*/),
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
                                "selections": (v12/*: any*/),
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
                                "selections": (v13/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Application",
                                "kind": "LinkedField",
                                "name": "application",
                                "plural": false,
                                "selections": (v13/*: any*/),
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
                                  (v5/*: any*/),
                                  (v9/*: any*/)
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v10/*: any*/),
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
    "cacheID": "af7a98067a8715b1a95f6fbf8daba51e",
    "id": null,
    "metadata": {},
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditApplicationPartComponent_UpdateComponentValues_Mutation(\n  $input: UpdateApplicationPartComponentValuesInput!\n) {\n  updateApplicationPartComponentValues(input: $input) {\n    component {\n      ...EditApplicationPartComponent_fragment\n      id\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment EditApplicationPartComponent_ChangeLog_Fragment on ApplicationPartComponent {\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n\nfragment EditApplicationPartComponent_fragment on ApplicationPartComponent {\n  applicationPart {\n    name\n    application {\n      name\n      namespace\n      id\n      variableValues {\n        variable {\n          name\n          id\n        }\n        id\n      }\n    }\n    variableValues {\n      variable {\n        name\n        id\n      }\n      id\n    }\n    id\n  }\n  definition {\n    id\n    name\n    state\n    schemaSdl\n    schema\n    values\n    defaults\n    schemaViolations {\n      path\n      code\n    }\n  }\n  version\n  values\n  ...EditApplicationPartComponent_ChangeLog_Fragment @defer(label: \"EditApplicationPartComponent_fragment$defer$EditApplicationPartComponent_ChangeLog_Fragment\")\n}\n"
  }
};
})();
(node as any).hash = 'bebda9d3b36f9aa14dd460d64d593e57';
export default node;
