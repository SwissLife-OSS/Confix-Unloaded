/**
 * @generated SignedSource<<2c1cb9a345f2d074bd3b346df4932bcc>>
 * @relayHash 5b1305d2f247fbd48bf6235bf91eef65
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c961a7651c50dccb90965c64896c943544e0043fbe903e4586f346f39b9bc02f

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddPartToApplicationInput = {
  applicationId: string;
  partName: string;
};
export type AddPartToApplicationDialogMutation$variables = {
  input: AddPartToApplicationInput;
};
export type AddPartToApplicationDialogMutation$data = {
  readonly addPartToApplication: {
    readonly application: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem" | "EditApplication">;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type AddPartToApplicationDialogMutation = {
  response: AddPartToApplicationDialogMutation$data;
  variables: AddPartToApplicationDialogMutation$variables;
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
    "name": "AddPartToApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddPartToApplicationPayload",
        "kind": "LinkedField",
        "name": "addPartToApplication",
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
    "name": "AddPartToApplicationDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AddPartToApplicationPayload",
        "kind": "LinkedField",
        "name": "addPartToApplication",
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c961a7651c50dccb90965c64896c943544e0043fbe903e4586f346f39b9bc02f",
    "metadata": {},
    "name": "AddPartToApplicationDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "446fdce0766114f737280cfa77bccd2c";

export default node;
