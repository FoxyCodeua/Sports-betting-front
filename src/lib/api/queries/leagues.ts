import { gql } from "graphql-request";

export const LEAGUES_QUERY = gql`
  query Leagues($filter: LeaguesFilterInput, $page: Int!, $limit: Int!) {
    leagues(filter: $filter, page: $page, limit: $limit) {
      id
      name
      logoUrl
      type
      importanceLevel
    }
  }
`;
