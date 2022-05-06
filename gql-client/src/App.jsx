import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import useGqlQuery from "./useGqlQuery";
import useGqlMutation from "./useGqlMutation";
import useLazyGqlQuery from "./useLazyGqlQuery";

const MEMBER_INFO_FRAGMENT = `#graphql
  fragment memberInfo on GqlMember {
    id
    name
    part
  }
`;

const ADD_MEMBER = `#graphql
  mutation addMember($name: String!, $part: SoptParts!){
    addMember: addGqlMember(newInput: { name: $name, part: $part }) {
      ...memberInfo
    }
  }
  ${MEMBER_INFO_FRAGMENT}
`;

const MEMBERS_QUERY = `#graphql
  query {
    members: getAllGqlMembers {
      ...memberInfo
    }
  } 
  ${MEMBER_INFO_FRAGMENT}
`;

const DIET_QUERY = `#graphql
  query memberOnDiet($id: ID!) {
    memberOnDiet: getGqlMember(id: $id) {
      isOnDiet
      name
    }
  }
`;

const DIET_MUTATION = `#graphql
  mutation toggleDiet($id: ID!) {
    toggleDiet: toggleDietStatus(id: $id) {
      isOnDiet
    }
  }
`;

function App() {
  const { data: members = [], refetch } = useGqlQuery(MEMBERS_QUERY);
  const [addMember] = useGqlMutation();
  const [getDietStatus, { data1 }] = useLazyGqlQuery(
    DIET_QUERY,
    undefined,
    "memberOnDiet"
  );

  const [toggleDietStatus, { data2 }] = useLazyGqlQuery(
    DIET_MUTATION,
    undefined,
    "toggleDiet"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(
      ADD_MEMBER,
      {
        name: e.target[0].value,
        part: e.target[1].value,
      },
      (res) => {
        console.log(res);
        refetch();
      }
    );
  };

  const isMemberOnDiet = async (memberId) => {
    const { name, isOnDiet } = await getDietStatus({ id: memberId });
    alert(`${name}은 현재 다이어트 ${isOnDiet ? "중입니다" : "중이 아닙니다"}`);
  };

  const toggleDiet = async (e, memberId) => {
    e.stopPropagation();
    const { isOnDiet } = await toggleDietStatus({ id: memberId });
  };

  return (
    <Container>
      <h1>글큐나!</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">스터디원 추가하기</label>
        <input type="text" placeholder="이름" />
        <select name="" id="">
          <option value="WEB">웹</option>
          <option value="DESIGN">디자인</option>
          <option value="SERVER">서버</option>
          <option value="PLAN">기획</option>
          <option value="ANDROID">안드</option>
          <option value="iOS">아요</option>
        </select>
      </form>

      <h2>스터디원 리스트</h2>
      <MemberList>
        {members.map(({ id, name, part }) => (
          <Member key={id} onClick={() => isMemberOnDiet(id)}>
            <h3>{name}</h3>
            <span>{part}</span>
            <DietBtn onClick={(e) => toggleDiet(e, id)}>
              다이어트 시키기
            </DietBtn>
          </Member>
        ))}
      </MemberList>
    </Container>
  );
}

const Container = styled.main`
  width: 500px;
  background-color: white;
  box-shadow: 3px 3px 5px white;
  border-radius: 8px;
  padding: 10px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MemberList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Member = styled.li`
  position: relative;
  list-style: none;
  padding: 15px;
  border-radius: 8px;
  background-color: #8040ff;
  color: white;

  &:hover {
    transform: scale(1.02);
  }
`;

const DietBtn = styled.button`
  all: unset;
  position: absolute;
  bottom: 5px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }

  background-color: white;
  color: #3f3f3f;
  border-radius: 18px;
  padding: 5px 10px;
`;

export default App;
