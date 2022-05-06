import styled from "styled-components";
import { useEffect, useState } from "react";
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
  mutation ($name: String!, $part: SoptParts!){
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
  query ($id: ID!) {
    memberOnDiet: getGqlMember(id: $id) {
      isOnDiet
      name
    }
  }
`;

const DIET_MUTATION = `#graphql
  mutation ($id: ID!) {
    toggleDiet: toggleDietStatus(id: $id) {
      isOnDiet
    }
  }
`;

const DELETE_MEMBER = `#graphql
  mutation ($id: ID!) {
    deleteMember: deleteX(id: $id)
  }
  
`;

function App() {
  const { data: members = [], refetch } = useGqlQuery(MEMBERS_QUERY);
  const [addMember] = useGqlMutation("addMember");
  const [getDietStatus, { data1 }] = useLazyGqlQuery(
    DIET_QUERY,
    undefined,
    "memberOnDiet"
  );

  const [toggleDietStatus] = useGqlMutation("toggleDiet");

  const [deleteMemeber] = useGqlMutation("deleteMember");

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(
      ADD_MEMBER,
      {
        part: e.target[0].value,
        name: e.target[1].value,
      },
      (res) => {
        console.log(res);
        refetch();
      }
    );

    e.target[1].value = "";
  };

  const isMemberOnDiet = async (memberId) => {
    const { name, isOnDiet } = await getDietStatus({ id: memberId });
    alert(`${name}은 현재 다이어트 ${isOnDiet ? "중입니다" : "중이 아닙니다"}`);
  };

  const toggleDiet = async (e, memberId) => {
    e.stopPropagation();
    await toggleDietStatus(DIET_MUTATION, { id: memberId });
  };

  const expelMember = async (e, memberId) => {
    e.stopPropagation();
    await deleteMemeber(DELETE_MEMBER, { id: memberId });
    refetch();
  };

  return (
    <Container>
      <h1>나커박 글큐나 클라이언트 실습</h1>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">스터디원 추가하기</label>
        <select name="" id="">
          <option value="WEB">웹</option>
          <option value="DESIGN">디자인</option>
          <option value="SERVER">서버</option>
          <option value="PLAN">기획</option>
          <option value="ANDROID">안드</option>
          <option value="iOS">아요</option>
        </select>
        <input type="text" placeholder="이름" />
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
            <ExpelBtn onClick={(e) => expelMember(e, id)}>
              스터디 쫓아내기
            </ExpelBtn>
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
  margin: 35px auto;

  display: flex;
  flex-direction: column;
  gap: 30px;

  & > h1 {
    margin: 0 auto;
    color: #6d0d2d;
  }

  & > form label {
    display: block;
  }
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

const Btn = styled.button`
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

const DietBtn = styled(Btn)`
  &:hover {
    background-color: lightgray;
    transform: scale(0.95);
  }
`;
const ExpelBtn = styled(Btn)`
  top: 5px;
  bottom: unset;

  &:hover {
    background-color: lightgray;
    transform: scale(0.95);
  }
`;

export default App;
