/**
 * @generated SignedSource<<4a5a0201f7692d5e5355e3bba29f4fa3>>
 * @relayHash ffc1ea821c519551351e3b00a4f2bd58
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ffc1ea821c519551351e3b00a4f2bd58

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartQuery$variables = {
  id: string;
};
export type EditApplicationPartQuery$data = {
  readonly applicationPartById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart">;
  } | null;
};
export type EditApplicationPartQuery = {
  response: EditApplicationPartQuery$data;
  variables: EditApplicationPartQuery$variables;
};

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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespace",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v7 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ApplicationPart",
  "kind": "LinkedField",
  "name": "part",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tag",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v15 = [
  (v3/*: any*/)
],
v16 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v17 = [
  (v2/*: any*/)
],
v18 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  }
],
v19 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationPartQuery",
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
            "name": "EditApplicationPart"
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
    "name": "EditApplicationPartQuery",
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
              (v4/*: any*/),
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
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "PublishedVersionsConnection",
            "kind": "LinkedField",
            "name": "publishedVersions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PublishedVersionsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PublishedApplicationPart",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserInfo",
                        "kind": "LinkedField",
                        "name": "publishedBy",
                        "plural": false,
                        "selections": (v9/*: any*/),
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClaimedVersion",
                        "kind": "LinkedField",
                        "name": "claimsVersions",
                        "plural": true,
                        "selections": [
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "publishedVersions(first:20)"
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "part_publishedVersions",
            "kind": "LinkedHandle",
            "name": "publishedVersions"
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplicationPart$defer$EditApplicationPart_Variable",
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
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
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
                    "selections": (v14/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Variable",
                    "kind": "LinkedField",
                    "name": "variable",
                    "plural": false,
                    "selections": (v14/*: any*/),
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
            "label": "EditApplicationPart$defer$ApplicationPartChangeLog",
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
                    "selections": (v9/*: any*/),
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
                      (v13/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v15/*: any*/),
                        "type": "RenameApplicationChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v15/*: any*/),
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
                            "selections": (v16/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v16/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v17/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Application",
                            "kind": "LinkedField",
                            "name": "application",
                            "plural": false,
                            "selections": (v17/*: any*/),
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
                              (v10/*: any*/)
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
                        "selections": (v18/*: any*/),
                        "type": "CreateComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
                        "type": "RemoveComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
                        "type": "RenameComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v19/*: any*/),
                        "type": "CreateVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v19/*: any*/),
                        "type": "DeleteVariableValueChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v19/*: any*/),
                        "type": "RenameVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v19/*: any*/),
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
                          (v8/*: any*/)
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
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplicationPart$defer$EditApplicationPart_DeployedEnvironments",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "DeploymentsConnection",
                "kind": "LinkedField",
                "name": "deployments",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeployedEnvironment",
                    "kind": "LinkedField",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Environment",
                        "kind": "LinkedField",
                        "name": "environment",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Environment",
                            "kind": "LinkedField",
                            "name": "parent",
                            "plural": false,
                            "selections": (v14/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClaimedVersionsConnection",
                        "kind": "LinkedField",
                        "name": "claimedVersions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ClaimedVersion",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              (v11/*: any*/),
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
                                "concreteType": "ApplicationPart",
                                "kind": "LinkedField",
                                "name": "applicationPart",
                                "plural": false,
                                "selections": (v7/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PublishedApplicationPart",
                                "kind": "LinkedField",
                                "name": "publishedApplicationPart",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  (v10/*: any*/),
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v12/*: any*/),
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
    "id": "ffc1ea821c519551351e3b00a4f2bd58",
    "metadata": {},
    "name": "EditApplicationPartQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "dd9e84f61fff41ac97ec4c5f4a50ef60";

export default node;
