import { graphql } from "babel-plugin-relay/macro";
import { loadQuery, usePreloadedQuery } from "react-relay";
import styled from "styled-components";
import FollowerList from "./components/FollowerList";
import FollowingList from "./components/FollowingList";
import RelayEnvironment from "./relay/RelayEnvironment";
import { AppViewerQuery } from "./__generated__/AppViewerQuery.graphql";

const QUERY = graphql`
  query AppViewerQuery {
    viewer {
      id
      name
      ...FollowerList_followers
      ...FollowingList_followings
    }
  }
`;

const preloadedQuery = loadQuery<AppViewerQuery>(RelayEnvironment, QUERY, {});

function App() {
  const data = usePreloadedQuery(QUERY, preloadedQuery);
  return (
    <Container>
      <div>
        <h1>내가 맞팔 안함</h1>
        {data?.viewer && <FollowerList user={data.viewer} />}
      </div>
      <div>
        <h1>내 팔로잉들</h1>
        {data?.viewer && <FollowingList user={data.viewer} />}
      </div>
    </Container>
  );
}

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;

  display: flex;
  gap: 50px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default App;
