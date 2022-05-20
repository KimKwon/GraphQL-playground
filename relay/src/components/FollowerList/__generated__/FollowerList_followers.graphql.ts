/**
 * @generated SignedSource<<56d495a5b74c043b44eaeb359a00f98c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowerList_followers$data = {
  readonly followers: {
    readonly nodes: ReadonlyArray<{
      readonly id: string;
      readonly avatarUrl: any;
      readonly name: string | null;
      readonly bio: string | null;
      readonly login: string;
      readonly viewerIsFollowing: boolean;
      readonly followers: {
        readonly totalCount: number;
      };
    } | null> | null;
  };
  readonly " $fragmentType": "FollowerList_followers";
};
export type FollowerList_followers$key = {
  readonly " $data"?: FollowerList_followers$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowerList_followers">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowerList_followers",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 65
        }
      ],
      "concreteType": "FollowerConnection",
      "kind": "LinkedField",
      "name": "followers",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
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
              "name": "avatarUrl",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "bio",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "login",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "viewerIsFollowing",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "FollowerConnection",
              "kind": "LinkedField",
              "name": "followers",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "totalCount",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "followers(first:65)"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "99e7574c8dd815a033215b2df67dc0b5";

export default node;
