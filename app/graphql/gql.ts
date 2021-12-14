import gql from 'graphql-tag';

export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = Maybe<T>;

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Info = {
  count?: Maybe<Scalars['Int']>;
  pages?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['Int']>;
  prev?: Maybe<Scalars['Int']>;
};

export const InfoFieldsFragment = gql`
  fragment InfoFields on Info {
    count
    pages
    next
    prev
  }
`

export type Character = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  species?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export const CharacterFieldsFragment = gql`
  fragment CharacterFields on Character {
    id
    name
    image
    gender
  }
`

export type Characters = {
  info?: Maybe<Info>;
  results?: Maybe<Array<Character>>;
};

export type Query = {
  character?: Maybe<Character>;
  characters?: Maybe<Characters>;
}

export type QueryCharacterArgs = {
  id: Scalars['ID'];
};

export type QueryCharactersArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

export const QUERY_CHARACTERS = gql`
  query characters($page: Int) {
    characters(page: $page) {
      info {
        ...InfoFields
      }
      results {
        ...CharacterFields
      }
    }
  }

  ${InfoFieldsFragment}
  ${CharacterFieldsFragment}
`;

export const QUERY_CHARACTER = gql`
  query character($id: ID!) {
    character(id: $id) {
      ...CharacterFields
    }
  }

  ${CharacterFieldsFragment}
`;
