/**
 * @generated SignedSource<<f6889a68bb4067912fa2d0c26caa5e08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnfollowUserInput = {
  clientMutationId?: string | null;
  userId: string;
};
export type FollowingListMutation$variables = {
  input: UnfollowUserInput;
};
export type FollowingListMutation$data = {
  readonly unfollowUser: {
    readonly user: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type FollowingListMutation = {
  variables: FollowingListMutation$variables;
  response: FollowingListMutation$data;
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
    "concreteType": "UnfollowUserPayload",
    "kind": "LinkedField",
    "name": "unfollowUser",
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
    "name": "FollowingListMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowingListMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "796a79da551bc6104cf6b6149321f89c",
    "id": null,
    "metadata": {},
    "name": "FollowingListMutation",
    "operationKind": "mutation",
    "text": "mutation FollowingListMutation(\n  $input: UnfollowUserInput!\n) {\n  unfollowUser(input: $input) {\n    user {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc17640a05b32b84846224420c7f690f";

export default node;
