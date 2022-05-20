import { graphql } from "babel-plugin-relay/macro";
import { ConnectionHandler } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import styled from "styled-components";

function FollowerList(props) {
  const data = useFragment(
    graphql`
      fragment FollowerList_followers on User {
        followers(first: 65) {
          nodes {
            id
            avatarUrl
            name
            bio
            login
            viewerIsFollowing
          }
        }
      }
    `,
    props.user
  );

  const {
    followers: { nodes },
  } = data;

  const [followUser] = useMutation(graphql`
    mutation FollowerListMutation($input: FollowUserInput!) {
      followUser(input: $input) {
        user {
          id
          name
        }
      }
    }
  `);

  return (
    <StFollowers>
      {nodes &&
        nodes.map((node) => {
          if (!node || node.viewerIsFollowing) return null;
          const { id, avatarUrl, login, name, bio } = node;
          return (
            <StFollower key={id}>
              <img src={avatarUrl} alt="avata-url" />
              <div>
                <h2>{login}</h2>
                <h3>{name}</h3>
                <p>{bio || "소개가 없음."}</p>
              </div>
              <button
                onClick={() =>
                  followUser({
                    variables: {
                      input: {
                        userId: id,
                      },
                    },
                    onCompleted: (res) => console.log(res),
                    onError: (err) => console.log(err),
                    updater: (store) => {
                      const newFollowerProxy = store.get(id);
                      newFollowerProxy?.setValue(true, "viewerIsFollowing");
                      const viewerProxy = store.get(props.user.id);
                      if (!viewerProxy || !newFollowerProxy) return;

                      const connection = ConnectionHandler.getConnection(
                        viewerProxy,
                        "FollowingList_following"
                      );

                      if (!connection) return;

                      const newEdge = ConnectionHandler.createEdge(
                        store,
                        connection,
                        newFollowerProxy,
                        ""
                      );

                      ConnectionHandler.insertEdgeBefore(connection, newEdge);
                    },
                  })
                }
              >
                팔로우하기
              </button>
            </StFollower>
          );
        })}
    </StFollowers>
  );
}

const StFollowers = styled.ul`
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

const StFollower = styled.li`
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

export default FollowerList;
