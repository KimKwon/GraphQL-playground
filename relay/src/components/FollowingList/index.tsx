import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { ConnectionHandler } from "relay-runtime";
import styled from "styled-components";

function FollowingList(props) {
  const data = useFragment(
    graphql`
      fragment FollowingList_followings on User {
        following(first: 65) @connection(key: "FollowingList_following") {
          edges {
            node {
              id
              name
              bio
              avatarUrl
              login
            }
          }
        }
      }
    `,
    props.user
  );

  const {
    following: { edges },
  } = data;

  const [unFollowUser] = useMutation(graphql`
    mutation FollowingListMutation($input: UnfollowUserInput!) {
      unfollowUser(input: $input) {
        user {
          id
          name
        }
      }
    }
  `);

  return (
    <StFollowings>
      {edges &&
        edges.map((node) => {
          if (!node) return null;
          const { id, avatarUrl, login, name, bio } = node.node;
          return (
            <StFollowing key={id}>
              <img src={avatarUrl} alt="avata-url" />
              <div>
                <h2>{login}</h2>
                <h3>{name}</h3>
                <p>{bio || "소개가 없음."}</p>
              </div>
              <button
                onClick={() =>
                  unFollowUser({
                    variables: {
                      input: {
                        userId: id,
                      },
                    },
                    updater: (store) => {
                      const viewerProxy = store.get(props.user.id);

                      store.get(id)?.setValue(false, "viewerIsFollowing");

                      if (!viewerProxy) return;
                      const connection = ConnectionHandler.getConnection(
                        viewerProxy,
                        "FollowingList_following"
                      );

                      if (!connection) return;

                      ConnectionHandler.deleteNode(connection, id);
                    },
                    onCompleted: (res) => console.log(res),
                    onError: (err) => console.log(err),
                  })
                }
              >
                언팔하기
              </button>
            </StFollowing>
          );
        })}
    </StFollowings>
  );
}

const StFollowings = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  border-radius: 18px;
  box-shadow: 5px 5px 10px 5px lightgray;
  padding: 30px;
`;

const StFollowing = styled.li`
  & * {
    margin: 0;
    padding: 0;
  }
  width: 200px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid black;
  padding: 10px;

  & > img {
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
    min-height: 100px;
  }

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 10px;
  }
`;

export default FollowingList;
