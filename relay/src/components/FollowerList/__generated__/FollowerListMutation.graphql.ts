/**
 * @generated SignedSource<<e3afb1e394d9fdbdff007d7e7f03680f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowUserInput = {
  clientMutationId?: string | null;
  userId: string;
};
export type FollowerListMutation$variables = {
  input: FollowUserInput;
};
export type FollowerListMutation$data = {
  readonly followUser: {
    readonly user: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type FollowerListMutation = {
  variables: FollowerListMutation$variables;
  response: FollowerListMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowUserPayload",
    "kind": "LinkedField",
    "name": "followUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowerListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowerListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "348090bc7de13b5c9b349a336dfe3695",
    "id": null,
    "metadata": {},
    "name": "FollowerListMutation",
    "operationKind": "mutation",
    "text": "mutation FollowerListMutation(\n  $input: FollowUserInput!\n) {\n  followUser(input: $input) {\n    user {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "03695551a681377caaa38b6b7366d7f2";

export default node;
