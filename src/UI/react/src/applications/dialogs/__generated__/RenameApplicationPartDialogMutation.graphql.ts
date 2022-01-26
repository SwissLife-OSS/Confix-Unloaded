/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RenameApplicationPartInput = {
    applicationPartId: string;
    name: string;
};
export type RenameApplicationPartDialogMutationVariables = {
    input: RenameApplicationPartInput;
};
export type RenameApplicationPartDialogMutationResponse = {
    readonly renameApplicationPart: {
        readonly applicationPart: {
            readonly application: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ApplicationsList_applicationsEdge">;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_fragment">;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type RenameApplicationPartDialogMutation = {
    readonly response: RenameApplicationPartDialogMutationResponse;
    readonly variables: RenameApplicationPartDialogMutationVariables;
};



/*
mutation RenameApplicationPartDialogMutation(
  $input: RenameApplicationPartInput!
) {
  renameApplicationPart(input: $input) {
    applicationPart {
      ...EditApplicationPart_fragment
      application {
        id
        ...ApplicationsList_applicationsEdge
      }
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

fragment ApplicationPartChangeLog_ChangeLog_Fragment on ApplicationPart {
  changeLog {
    ...ChangeLog_fragment
    id
  }
}

fragment ApplicationPartComponents_component on ApplicationPartComponent {
  id
  definition {
    id
    name
    state
  }
}

fragment ApplicationsList_applicationsEdge on Application {
  id
  name
  namespace
  parts {
    id
    name
    components {
      id
      definition {
        id
        name
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

fragment DeployedEnvironmentsOverviewFragment on DeployedEnvironment {
  environment {
    id
    name
    parent {
      id
      name
    }
  }
  claimedVersions {
    nodes {
      gitVersion
      application {
        name
        id
      }
      applicationPart {
        name
        id
      }
      publishedApplicationPart {
        id
        version
        publishedAt
      }
      environment {
        name
        id
      }
      id
    }
  }
}

fragment EditApplicationPart_DeployedEnvironment_Fragment on ApplicationPart {
  deployments {
    nodes {
      ...DeployedEnvironmentsOverviewFragment
    }
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
    ...ApplicationPartComponents_component
  }
  ...EditApplicationPart_VariableValues_Fragment @defer(label: "EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment")
  ...ApplicationPartChangeLog_ChangeLog_Fragment @defer(label: "EditApplicationPart_fragment$defer$ApplicationPartChangeLog_ChangeLog_Fragment")
  ...EditApplicationPart_DeployedEnvironment_Fragment @defer(label: "EditApplicationPart_fragment$defer$EditApplicationPart_DeployedEnvironment_Fragment")
  ...PublishedApplicationPartsFragment
}

fragment PublishedApplicationPartsFragment on ApplicationPart {
  publishedVersions(first: 20) {
    edges {
      node {
        id
        publishedAt
        part {
          name
          id
        }
        publishedBy {
          email
        }
        version
        claimsVersions {
          gitVersion
          environment {
            name
            id
          }
          id
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v4/*: any*/)
],
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "publishedAt",
  "storageKey": null
},
v8 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ApplicationPart",
  "kind": "LinkedField",
  "name": "part",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gitVersion",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = [
  (v4/*: any*/)
],
v16 = [
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
    "selections": (v8/*: any*/),
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
    "selections": (v8/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RenameApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPartPayload",
        "kind": "LinkedField",
        "name": "renameApplicationPart",
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
                    "name": "ApplicationsList_applicationsEdge"
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApplicationPart_fragment"
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
    "name": "RenameApplicationPartDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPartPayload",
        "kind": "LinkedField",
        "name": "renameApplicationPart",
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
              (v4/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "parts",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
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
                            "selections": (v5/*: any*/),
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
                      (v4/*: any*/),
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
                "args": (v6/*: any*/),
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
                          (v7/*: any*/),
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserInfo",
                            "kind": "LinkedField",
                            "name": "publishedBy",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ClaimedVersion",
                            "kind": "LinkedField",
                            "name": "claimsVersions",
                            "plural": true,
                            "selections": [
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/)
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
                "args": (v6/*: any*/),
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
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Variable",
                        "kind": "LinkedField",
                        "name": "variable",
                        "plural": false,
                        "selections": (v5/*: any*/),
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
                          (v14/*: any*/),
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
                                  (v11/*: any*/)
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
                              (v9/*: any*/)
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
                        "selections": (v10/*: any*/),
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
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Environment",
                                "kind": "LinkedField",
                                "name": "parent",
                                "plural": false,
                                "selections": (v5/*: any*/),
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
                                  (v12/*: any*/),
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
                                    "concreteType": "ApplicationPart",
                                    "kind": "LinkedField",
                                    "name": "applicationPart",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
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
                                      (v11/*: any*/),
                                      (v7/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v13/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v14/*: any*/),
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
    "cacheID": "f0ae7f4f2adf67aa4c536ba6c4ca366c",
    "id": null,
    "metadata": {},
    "name": "RenameApplicationPartDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameApplicationPartDialogMutation(\n  $input: RenameApplicationPartInput!\n) {\n  renameApplicationPart(input: $input) {\n    applicationPart {\n      ...EditApplicationPart_fragment\n      application {\n        id\n        ...ApplicationsList_applicationsEdge\n      }\n      id\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment ApplicationPartChangeLog_ChangeLog_Fragment on ApplicationPart {\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n\nfragment ApplicationPartComponents_component on ApplicationPartComponent {\n  id\n  definition {\n    id\n    name\n    state\n  }\n}\n\nfragment ApplicationsList_applicationsEdge on Application {\n  id\n  name\n  namespace\n  parts {\n    id\n    name\n    components {\n      id\n      definition {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment DeployedEnvironmentsOverviewFragment on DeployedEnvironment {\n  environment {\n    id\n    name\n    parent {\n      id\n      name\n    }\n  }\n  claimedVersions {\n    nodes {\n      gitVersion\n      application {\n        name\n        id\n      }\n      applicationPart {\n        name\n        id\n      }\n      publishedApplicationPart {\n        id\n        version\n        publishedAt\n      }\n      environment {\n        name\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment EditApplicationPart_DeployedEnvironment_Fragment on ApplicationPart {\n  deployments {\n    nodes {\n      ...DeployedEnvironmentsOverviewFragment\n    }\n  }\n}\n\nfragment EditApplicationPart_VariableValues_Fragment on ApplicationPart {\n  variableValues {\n    ...VariableValueList_values\n    id\n  }\n}\n\nfragment EditApplicationPart_fragment on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n    name\n  }\n  components {\n    id\n    definition {\n      id\n    }\n    ...ApplicationPartComponents_component\n  }\n  ...EditApplicationPart_VariableValues_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_VariableValues_Fragment\")\n  ...ApplicationPartChangeLog_ChangeLog_Fragment @defer(label: \"EditApplicationPart_fragment$defer$ApplicationPartChangeLog_ChangeLog_Fragment\")\n  ...EditApplicationPart_DeployedEnvironment_Fragment @defer(label: \"EditApplicationPart_fragment$defer$EditApplicationPart_DeployedEnvironment_Fragment\")\n  ...PublishedApplicationPartsFragment\n}\n\nfragment PublishedApplicationPartsFragment on ApplicationPart {\n  publishedVersions(first: 20) {\n    edges {\n      node {\n        id\n        publishedAt\n        part {\n          name\n          id\n        }\n        publishedBy {\n          email\n        }\n        version\n        claimsVersions {\n          gitVersion\n          environment {\n            name\n            id\n          }\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment VariableValueList_values on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();
(node as any).hash = 'eb578567beeb4bdbc50dbd3d4144c9cd';
export default node;
