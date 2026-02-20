import { gql } from "graphql-request";

export const MATCHES_QUERY = gql`
  query Matches(
    $filter: MatchesFilterInput
    $page: Int!
    $limit: Int!
    $sortBy: String
    $sortDirection: String
  ) {
    matches(
      filter: $filter
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      id
      scheduledAt
      status
      homeScore
      awayScore
      homeTeam {
        id
        name
        logoUrl
      }
      awayTeam {
        id
        name
        logoUrl
      }
      league {
        id
        name
        logoUrl
      }
    }
  }
`;

export const MATCHES_COUNT_QUERY = gql`
  query MatchesCount($filter: MatchesFilterInput) {
    matchesCount(filter: $filter)
  }
`;

export const MATCH_DETAIL_QUERY = gql`
  query Match($id: Int!) {
    match(id: $id) {
      id
      externalId
      scheduledAt
      status
      homeScore
      awayScore
      homeFormation
      awayFormation
      homeCoachName
      awayCoachName
      lineupsStatus
      venueName
      weatherCondition
      refereeName
      homeTeam {
        id
        name
        logoUrl
        strengthTier
        styleTags
        players {
          id
          name
          position
          jerseyNumber
          status
          importance
          injuries {
            id
            type
            expectedReturn
            description
          }
        }
      }
      awayTeam {
        id
        name
        logoUrl
        strengthTier
        styleTags
        players {
          id
          name
          position
          jerseyNumber
          status
          importance
          injuries {
            id
            type
            expectedReturn
            description
          }
        }
      }
      league {
        id
        name
        logoUrl
        type
      }
      statistics {
        id
        xg_home
        xg_away
        corners_home
        corners_away
        shots_on_target_home
        shots_on_target_away
        shots_home
        shots_away
        possession_home
        possession_away
        fouls_home
        fouls_away
        offsides_home
        offsides_away
        cards_yellow_home
        cards_yellow_away
        cards_red_home
        cards_red_away
        goals_home
        goals_away
        attacks_home
        attacks_away
        dangerous_attacks_home
        dangerous_attacks_away
        goal_kicks_home
        goal_kicks_away
        free_kicks_home
        free_kicks_away
        throw_ins_home
        throw_ins_away
        crosses_home
        crosses_away
        saves_home
        saves_away
        first_half_goals_home
        first_half_goals_away
        first_half_xg_home
        first_half_xg_away
      }
      odds {
        id
        marketType
        value
        bookmaker
        timestamp
      }
    }
  }
`;
