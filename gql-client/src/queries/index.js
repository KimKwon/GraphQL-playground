export const MEMBER_INFO_FRAGMENT = `#graphql
  fragment memberInfo on GqlMember {
    id
    name
    part
  }
`;

export const ADD_MEMBER = `#graphql
  mutation ($name: String!, $part: SoptParts!){
    addMember: addGqlMember(newInput: { name: $name, part: $part }) {
      ...memberInfo
    }
  }
  ${MEMBER_INFO_FRAGMENT}
`;

export const MEMBERS_QUERY = `#graphql
  query {
    members: getAllGqlMembers {
      ...memberInfo
    }
  } 
  ${MEMBER_INFO_FRAGMENT}
`;

export const DIET_QUERY = `#graphql
  query ($id: ID!) {
    memberOnDiet: getGqlMember(id: $id) {
      isOnDiet
      name
    }
  }
`;

export const DIET_MUTATION = `#graphql
  mutation ($id: ID!) {
    toggleDiet: toggleDietStatus(id: $id) {
      isOnDiet
    }
  }
`;

export const DELETE_MEMBER = `#graphql
  mutation ($id: ID!) {
    deleteMember: deleteX(id: $id)
  }
`;
