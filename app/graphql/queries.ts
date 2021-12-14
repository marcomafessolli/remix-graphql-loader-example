import gql from 'graphql-tag';
import { client } from './client';

import { InfoFieldsFragment, CharacterFieldsFragment, Query } from './types';

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

export async function queryCharacters() {
  return await client.query<Query>(QUERY_CHARACTERS).toPromise();
}

export async function queryCharacter(id: number) {
  return await client.query<Query>(QUERY_CHARACTER, { id }).toPromise();
}
