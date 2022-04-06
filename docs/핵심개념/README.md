# 핵심 개념

## SDL
SDL -> Schema Definition Language.

GraphQL은 api의 스키마를 정의하기 위한 그들만의 타입 시스템이 있다.
이 때 쓰이는 문법이 SDL이다.

다음은 `Person` 이라는 타입을 정의한 SDL이다.

```graphql
type Person {
    name: String!
    age: Int!
}
```

`name`과 `age` 두개의 필드가 있다.
그리고 이는 각각 String, Int 타입이다.

`!`는 필수 속성임을 의미한다.

두 타입간의 관계를 표현하는 것 역시 가능하다.
블로그 앱을 예를 들면 `Person`은 `Post`와 관련이 있다.

```graphql
type Post {
  title: String!
  author: Person!
}
```

```graphql
type Person {
  name: String!
  age: Int!
  posts: [Post!]! # Post 배열을 의미함.
}
```

중요한 것은 `Person`과 `Post` 간의 1:N 관계를 만들었다는 것. 

## 쿼리를 통해 데이터 패치하기

REST API를 통해 작업하다보면 데이터는 특정 endpoint로부터 불러와진다.

각 endpoint는 반환하는 정보의 구조가 명확히 정의되어있다.

이는 클라이언트가 요구하는 데이터는 그와 연결된 URL 안에 효율적으로 인코딩되어있음을 의미한다.

GraphQL이 가져가는 접근 방식은 아예 다르다.

고정된 데이터 구조를 반환하는 여러개의 endpoint를 두는 것 대신에
GraphQL API들은 전형적으로 단 하나의 endpoint를 노출한다.

이는 반환되는 데이터의 구조가 고정되어 있지 않기 때문에 가능하다.
이 방식은 굉장히 유연하고 클라이언트로 하여금 어떤 데이터가 실제로 필요한지를 결정할 수 있게 해준다.
때문에 클라이언트는 서버에게 그들이 찾는 데이터를 표현하기 위한 더 많은 정보를 보내야한다.
이를 `query`라고 부른다.

### 기본 쿼리
```graphql

{
    allPersons {
        name
    }
}

```

쿼리 내의 `allPersons` 필드는 쿼리의 `root field` 라고 부른다.
root field 하위의 모든 것은 쿼리의 `payload`라고 부른다.

이 쿼리에서 특정된 유일한 필드의 payload는 name이다.


위의 쿼리는 데이터베이스에 저장된 person의 리스트를 반환할 것이다.
응답의 예시를 살펴보자.

```json
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" },
  ],
}
```

여기서 중요한 것은 주어진 응답의 모든 person들은 `name` 만 가지고 있다는 것이다.
`age`는 오지 않았음. 이는 쿼리에 name 필드 밖에 없었기 때문이다.

클라이언트에서 age 속성도 필요로한다면 쿼리를 약간 수정하기만 하면된다.

```graphql
{
  allPersons {
    name
    age
  }
}
```

GraphQL의 가장 큰 장점은 nested 된 정보를 요청하는 것을 자연히 허용한다는 것이다.
예를 들어 `Person`이 작성한 모든 `posts` 를 불러오고 싶다면 간단하게 아래와 같은 구조로 요청하기만 하면 된다.

```graphql
{
    allPersons {
        name
        age
        posts {
            title
        }
    }
}
```

### argument를 동반한 쿼리

GraphQL에서 각 필드는 0 이상의 arguments를 가질 ㅅ ㅜ있다.
예를 들어, schema가 다음과 같다면  `allPersons` 필드는 `last` 라는 파라미터에 의해 특정한 숫자의 사람만 반환하도록 할 수 있다.

```graphql
{
    allPersons(last: 2) {
        name
    }
}
```


## Mutation을 통해 데이터 작성/변경하기

서버에게 정보를 요청하는 것 다음으로 대다수의 어플리케이션은 현재 백엔드에 저장되어 있는 데이터를 변경하는 방법을 필요로 한다.

GraphQL에서는 이 변화들을 가능케 하는 것을 `mutation` 이라고 부른다.

일반적으로 3가지의 mutation이 존재한다.
* 새로운 데이터 생성
* 기존 데이터 업데이트
* 기존 데이터 삭제

Mutation은 쿼리와 같이 동일한 문법적 구조를 갖지만 항상 앞에 `mutation` 이라는 키워드를 붙여야한다.
새로운 `Person`을 생성하는 mutation의 예시이다.

```graphql
mutation {
    createPerson(name: "Bob", age: 36) {
        name
        age
    }
}
```

위에서 작성한 쿼리와 유사하게 mutation 또한 root field를 갖는다. 
이 경우에는 `createPerson` 인데 이 필드는 새로운 person을 특정하는 name과 age라는 두개의 argument를 받는다.

쿼리와 유사하게 payload를 지정할 수 있다. 새로 생성된 Person 객체의 어떤 특성을 요구하는지 ...
이 경우에는 name과 age를 특정했다.
mutation을 보내는 동시에 query를 보낼 수 있다는 것은 굉장히 강력한 도구이다.
(생성과 동시에 그 새롭게 생성된 정보를 획득할 수 있다는 의미)

GraphQL 타입은 서버로부터 생성된 unique한 ID들을 갖는다. 이 ID는 새로운 객체가 생성되었을 때 같이 생성된다.
아까 만들었던 Person 객체에 id를 추가해보자.

```graphql
type Person {
    id: ID!
    name: String!
    age: Int!
}
```

그럼 새로운 `Person` 객체를 생성하고 생성된 Person의 ID를 가져와보도록 하자.

```graphql
mutation {
    createPerson(name: "Alice", age: 36) {
        id
    }
}
```

## Subscription을 통한 실시간 업데이트

오늘날 애플리케이션의 또다른 중요 요구사항은 서버와의 실시간 연결을 통한 중요한 이벤트에 대한 정보를 즉각적으로 얻어오는 것이다.

이러한 use case에 따라, GraphQL은 `subscriptions` 라는 개념을 제시한다.

클라이언트가 어떤 이벤트를 구독하면 서버와의 연결을 initiate하고 꾸준하게 이 연결을 유지한다.

언제든 그 특정한 이벤트가 발생하면, 서버는 클라이언트에게 해당하는 데이터를 push해준다.
전형적인 query와 mutation 같이 `request-response-cycle` 이 아닌 `subscriptions` 는 클라이언트에게 데이터를 전송하는 일종의 스트림을 나타낸다.


`Subscriptions` 은 쿼리와 뮤테이션처럼 똑같은 문법을 사용한다.
밑의 코드는 Person에서 일어나는 이벤트를 구독하는 예시이다.
```graphql
subscription {
    newPerson {
        name
        age
    }
}
```

클라이언트가 이 구독을 서버에게 전송한 이후에는 클-서 간의 Connection이 수립된다.
그럼 언제든 person을 새로 생성하는 mutation이 일어난다면 서버는 밑의 정보를 클라이언트에게 전송한다.

```json
{
    "newPerson": {
        "name": "Jane",
        "age": 23
    }
}
```

## Schema 정의하기

쿼리와 뮤테이션과 구독에 대한 기본적인 이해를 해보았다.
이걸 다 때려박아서 써보자.
어떻게 스키마를 작성하고 위에 사용했던 예시들을 어떻게 실행하는지 ! 

스키마는 GraphQL API와 함께하는 가장 중요한 개념 중 하나이다.
이는 API의 가용성을 지정하고 어떻게 클라이언트가 데이터를 요청하는 지를 정의할 수 있다.

서버와 클라이언트 간의 계약이라고 생각하면 된다.

일반적으로 스키마는 GraphQL type의 집합이다.
하지만 API를 위한 스키마를 작성할 때 특별한 몇개의 `root types` 가 있다.

```graphql
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

이 3개의 타입은 클라이언트가 보내는 요청의 `entry points`이다.

우리가 이전에 확인했던 `allPersons` 쿼리를 가능하게 하기 위해서는
`Query` 타입이 다음과 같이 작성되어야한다.

```graphql
type Query {
  allPersons: [Person!]!
}
```

`allPersons` 는 API의 `root field`라고 불린다.
아까 `last`라는 argument를 사용했던 예시를 생각해보자. 
그 때의 쿼리는 다음과 같이 정의하면 된다.
``` graphql
type Query {
  allPersons(last: Int): [Person!]!
}
```

유사하게, `createPerson` 뮤테이션의 경우에는 `Mutation` type의 `root field` 를 추가해줘야한다.

```graphql
type Mutation {
  createPerson(name: String!, age: Int!): Person!
}
```

마지막으로 구독의 경우에는 `new Person` 이라는 root field를 추가해준다.
```graphql
type Subscription {
  newPerson: Person!
}
```

다 때려박아서 schema 풀버젼을 확인해보자.

```graphql
type Query {
  allPersons(last: Int): [Person!]!
  allPosts(last: Int): [Post!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
  updatePerson(id: ID!, name: String!, age: String!): Person!
  deletePerson(id: ID!): Person!
}

type Subscription {
  newPerson: Person!
}

type Person {
  id: ID!
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}

```


> GraphQL 공식문서를 번역함.
>  https://www.howtographql.com/basics/2-core-concepts/
