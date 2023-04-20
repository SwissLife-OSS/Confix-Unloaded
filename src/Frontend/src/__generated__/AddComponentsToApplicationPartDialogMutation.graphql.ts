/**
 * @generated SignedSource<<8968eec21e3cfc9bfe3049a4ee13c8e8>>
 * @relayHash bc489d319e009a9e34055b724efe1ade
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ce57e7b8e801c39ff822ee92ab61ac8c1efd3b8e2362f5b7bd280e993a521777

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddComponentsToApplicationPartInput = {
  applicationPartId: string;
  componentIds: ReadonlyArray<string>;
};
export type AddComponentsToApplicationPartDialogMutation$variables = {
  input: AddComponentsToApplicationPartInput;
};
export type AddComponentsToApplicationPartDialogMutation$data = {
  readonly addComponentsToApplicationPart: {
    readonly applicationPart: {
      readonly application: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem" | "EditApplication">;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type AddComponentsToApplicationPartDialogMutation = {
  response: AddComponentsToApplicationPartDialogMutation$data;
  variables: AddComponentsToApplicationPartDialogMutation$variables;
};

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
      "type": "UserError",
      "abstractKey": "__isUserError"
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
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespace",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v5/*: any*/)
],
v8 = [
  (v5/*: any*/)
],
v9 = [
  (v5/*: any*/),
  (v2/*: any*/)
],
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v11 = [
  (v2/*: any*/)
],
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  }
],
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddComponentsToApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddComponentsToApplicationPartPayload",
        "kind": "LinkedField",
        "name": "addComponentsToApplicationPart",
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ApplicationsListItem"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "EditApplication"
                  }
                ],
                "storageKey": null
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
    "name": "AddComponentsToApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddComponentsToApplicationPartPayload",
        "kind": "LinkedField",
        "name": "addComponentsToApplicationPart",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "application",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "parts",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      (v2/*: any*/),
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
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Application",
                        "kind": "LinkedField",
                        "name": "application",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "if": null,
                    "kind": "Defer",
                    "label": "EditApplication$defer$EditApplication_Variables",
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
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Variable",
                            "kind": "LinkedField",
                            "name": "variable",
                            "plural": false,
                            "selections": (v7/*: any*/),
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
                    "label": "EditApplication$defer$EditApplication_ApplicationChangeLog",
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
                          },
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
                                "selections": (v8/*: any*/),
                                "type": "RenameApplicationChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v8/*: any*/),
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
                                    "selections": (v10/*: any*/),
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
                                    "selections": (v9/*: any*/),
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
                                    "selections": (v10/*: any*/),
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
                                    "selections": (v9/*: any*/),
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
                                    "selections": (v11/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Application",
                                    "kind": "LinkedField",
                                    "name": "application",
                                    "plural": false,
                                    "selections": (v11/*: any*/),
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
                                "selections": (v12/*: any*/),
                                "type": "CreateComponentChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v12/*: any*/),
                                "type": "RemoveComponentChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v12/*: any*/),
                                "type": "RenameComponentChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v13/*: any*/),
                                "type": "CreateVariableChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v13/*: any*/),
                                "type": "DeleteVariableValueChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v13/*: any*/),
                                "type": "RenameVariableChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v13/*: any*/),
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
                                    "selections": (v9/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "type": "PublishedApplicationPartChange",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": "versionOfApp",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "applicationVersion",
                                    "storageKey": null
                                  }
                                ],
                                "type": "ApplicationChange",
                                "abstractKey": "__isApplicationChange"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": "versionOfPart",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "partVersion",
                                    "storageKey": null
                                  }
                                ],
                                "type": "ApplicationPartChange",
                                "abstractKey": "__isApplicationPartChange"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": "versionOfPartComponent",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "partComponentVersion",
                                    "storageKey": null
                                  }
                                ],
                                "type": "ApplicationPartComponentChange",
                                "abstractKey": "__isApplicationPartComponentChange"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": "versionOfComponent",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "componentVersion",
                                    "storageKey": null
                                  }
                                ],
                                "type": "ComponentChange",
                                "abstractKey": "__isComponentChange"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": "versionOfVariable",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "variableVersion",
                                    "storageKey": null
                                  }
                                ],
                                "type": "VariableChange",
                                "abstractKey": "__isVariableChange"
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
              (v2/*: any*/)
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
    "id": "ce57e7b8e801c39ff822ee92ab61ac8c1efd3b8e2362f5b7bd280e993a521777",
    "metadata": {},
    "name": "AddComponentsToApplicationPartDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "97143a2716580a9d2dfd1ef66a15a74f";

export default node;
