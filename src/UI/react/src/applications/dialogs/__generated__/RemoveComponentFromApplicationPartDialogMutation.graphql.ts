/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RemoveComponentFromApplicationPartInput = {
    partComponentId: string;
};
export type RemoveComponentFromApplicationPartDialogMutationVariables = {
    input: RemoveComponentFromApplicationPartInput;
};
export type RemoveComponentFromApplicationPartDialogMutationResponse = {
    readonly removeComponentFromApplicationPart: {
        readonly applicationPart: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_fragment">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly __typename: string;
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type RemoveComponentFromApplicationPartDialogMutation = {
    readonly response: RemoveComponentFromApplicationPartDialogMutationResponse;
    readonly variables: RemoveComponentFromApplicationPartDialogMutationVariables;
};



/*
mutation RemoveComponentFromApplicationPartDialogMutation(
  $input: RemoveComponentFromApplicationPartInput!
) {
  removeComponentFromApplicationPart(input: $input) {
    applicationPart {
      id
      ...EditApplicationPart_fragment
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

fragment EditApplicationPartComponent_component on ApplicationPartComponent {
  id
  definition {
    id
    name
    state
  }
}

fragment EditApplicationPart_ChangeLog_Fragment on ApplicationPart {
  changeLog {
    ...ChangeLog_fragment
    id
  }
}

fragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {
  variableValues {
    ...VariableValueList_values
    id
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
  ...EditApplicationPart_VariableValues_Fragment @defer(label: "EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment")
  ...EditApplicationPart_ChangeLog_Fragment @defer(label: "EditApplicationPart_fragment$defer$EditApplicationPart_ChangeLog_Fragment")
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
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
      "type": "IUserError",
      "abstractKey": "__isIUserError"
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v5/*: any*/)
],
v7 = [
  (v5/*: any*/)
],
v8 = [
  (v5/*: any*/),
  (v2/*: any*/)
],
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v10 = [
  (v2/*: any*/)
],
v11 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  }
],
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveComponentFromApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeComponentFromApplicationPart",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApplicationPart_fragment"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveComponentFromApplicationPartPayload",
        "kind": "LinkedField",
        "name": "removeComponentFromApplicationPart",
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
              (v5/*: any*/),
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
                  (v5/*: any*/)
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
                      (v5/*: any*/),
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
              },
              {
                "if": null,
                "kind": "Defer",
                "label": "EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment",
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
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
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
                "label": "EditApplicationPart_fragment$defer$EditApplicationPart_ChangeLog_Fragment",
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
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v7/*: any*/),
                            "type": "RenameApplicationChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v7/*: any*/),
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
                                "selections": (v9/*: any*/),
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
                                "selections": (v8/*: any*/),
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
                                "selections": (v9/*: any*/),
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
                                "selections": (v8/*: any*/),
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
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Application",
                                "kind": "LinkedField",
                                "name": "application",
                                "plural": false,
                                "selections": (v10/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "type": "CreateComponentChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "RemoveComponentChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "RenameComponentChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "CreateVariableChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "DeleteVariableValueChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
                            "type": "RenameVariableChange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v12/*: any*/),
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
                ]
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4d1c47d0fccb9949768f65a11f91b400",
    "id": null,
    "metadata": {},
    "name": "RemoveComponentFromApplicationPartDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveComponentFromApplicationPartDialogMutation(\n  $input: RemoveComponentFromApplicationPartInput!\n) {\n  removeComponentFromApplicationPart(input: $input) {\n    applicationPart {\n      id\n      ...EditApplicationPart_fragment\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment EditApplicationPartComponent_component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n    state\n  }\n}\n\nfragment EditApplicationPart_ChangeLog_Fragment on ApplicationPart {\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n\nfragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {\n  variableValues {\n    ...VariableValueList_values\n    id\n  }\n}\n\nfragment EditApplicationPart_fragment on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n    name\n  }\n  components {\n    id\n    definition {\n      id\n    }\n    ...EditApplicationPartComponent_component\n  }\n  ...EditApplicationPart_VariableValues_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment\")\n  ...EditApplicationPart_ChangeLog_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_ChangeLog_Fragment\")\n}\n\nfragment VariableValueList_values on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();
(node as any).hash = 'a785e9aa48cf282d70c074978b753319';
export default node;
