/**
 * @generated SignedSource<<3d4d7bcd31990cafdb1f039621945a96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_GetById_Query$variables = {
  id: string;
};
export type EditApplicationPart_GetById_Query$data = {
  readonly applicationPartById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart_fragment">;
  } | null;
};
export type EditApplicationPart_GetById_Query = {
  response: EditApplicationPart_GetById_Query$data;
  variables: EditApplicationPart_GetById_Query$variables;
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
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v6 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "ApplicationPart",
  "kind": "LinkedField",
  "name": "part",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
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
  "name": "gitVersion",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v13 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v14 = [
  (v3/*: any*/)
],
v15 = [
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
v16 = [
  (v2/*: any*/)
],
v17 = [
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
v18 = [
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
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      (v5/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserInfo",
                        "kind": "LinkedField",
                        "name": "publishedBy",
                        "plural": false,
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClaimedVersion",
                        "kind": "LinkedField",
                        "name": "claimsVersions",
                        "plural": true,
                        "selections": [
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v12/*: any*/)
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
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "part_publishedVersions",
            "kind": "LinkedHandle",
            "name": "publishedVersions"
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
                    "selections": (v13/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Variable",
                    "kind": "LinkedField",
                    "name": "variable",
                    "plural": false,
                    "selections": (v13/*: any*/),
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
            "label": "EditApplicationPart_fragment$defer$ApplicationPartChangeLog_ChangeLog_Fragment",
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
                      (v12/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v14/*: any*/),
                        "type": "RenameApplicationChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v14/*: any*/),
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
                            "selections": (v15/*: any*/),
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
                            "selections": (v15/*: any*/),
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
                            "selections": (v16/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Application",
                            "kind": "LinkedField",
                            "name": "application",
                            "plural": false,
                            "selections": (v16/*: any*/),
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
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
                        "type": "CreateComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
                        "type": "RemoveComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
                        "type": "RenameComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
                        "type": "CreateVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
                        "type": "DeleteVariableValueChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
                        "type": "RenameVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v18/*: any*/),
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
                          (v7/*: any*/)
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
                    "selections": (v8/*: any*/),
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
            "label": "EditApplicationPart_fragment$defer$EditApplicationPart_DeployedEnvironment_Fragment",
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
                            "selections": (v13/*: any*/),
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
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Application",
                                "kind": "LinkedField",
                                "name": "application",
                                "plural": false,
                                "selections": (v6/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ApplicationPart",
                                "kind": "LinkedField",
                                "name": "applicationPart",
                                "plural": false,
                                "selections": (v6/*: any*/),
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
                                  (v9/*: any*/),
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v11/*: any*/),
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
    "cacheID": "88551f52d266140a707bb4a0e791690a",
    "id": null,
    "metadata": {},
    "name": "EditApplicationPart_GetById_Query",
    "operationKind": "query",
    "text": "query EditApplicationPart_GetById_Query(\n  $id: ID!\n) {\n  applicationPartById(id: $id) {\n    id\n    ...EditApplicationPart_fragment\n  }\n}\n\nfragment ApplicationPartChangeLog_ChangeLog_Fragment on ApplicationPart {\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n\nfragment ApplicationPartComponents_component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n    state\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n    ... on ApplicationChange {\n      __isApplicationChange: __typename\n      versionOfApp: applicationVersion\n    }\n    ... on ApplicationPartChange {\n      __isApplicationPartChange: __typename\n      versionOfPart: partVersion\n    }\n    ... on ApplicationPartComponentChange {\n      __isApplicationPartComponentChange: __typename\n      versionOfPartComponent: partComponentVersion\n    }\n    ... on ComponentChange {\n      __isComponentChange: __typename\n      versionOfComponent: componentVersion\n    }\n    ... on VariableChange {\n      __isVariableChange: __typename\n      versionOfVariable: variableVersion\n    }\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment DeployedEnvironmentsOverviewFragment on DeployedEnvironment {\n  environment {\n    id\n    name\n    parent {\n      id\n      name\n    }\n  }\n  claimedVersions {\n    nodes {\n      gitVersion\n      application {\n        name\n        id\n      }\n      applicationPart {\n        name\n        id\n      }\n      publishedApplicationPart {\n        id\n        version\n        publishedAt\n      }\n      environment {\n        name\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment EditApplicationPart_DeployedEnvironment_Fragment on ApplicationPart {\n  deployments {\n    nodes {\n      ...DeployedEnvironmentsOverviewFragment\n    }\n  }\n}\n\nfragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {\n  variableValues {\n    ...VariableValueList_values\n    id\n  }\n}\n\nfragment EditApplicationPart_fragment on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n    name\n  }\n  components {\n    id\n    definition {\n      id\n    }\n    ...ApplicationPartComponents_component\n  }\n  ...EditApplicationPart_VariableValues_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment\")\n  ...ApplicationPartChangeLog_ChangeLog_Fragment @defer(label: \"EditApplicationPart_fragment$defer$ApplicationPartChangeLog_ChangeLog_Fragment\")\n  ...EditApplicationPart_DeployedEnvironment_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_DeployedEnvironment_Fragment\")\n  ...PublishedApplicationPartsFragment\n}\n\nfragment PublishedApplicationPartsFragment on ApplicationPart {\n  publishedVersions(first: 20) {\n    edges {\n      node {\n        id\n        publishedAt\n        part {\n          name\n          id\n        }\n        publishedBy {\n          email\n        }\n        version\n        claimsVersions {\n          gitVersion\n          environment {\n            name\n            id\n          }\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment VariableValueList_values on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();

(node as any).hash = "f84748042f2c749a1f8f6b1b9c19bcaf";

export default node;
