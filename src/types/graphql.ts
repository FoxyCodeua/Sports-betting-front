export enum MatchStatus {
  SCHEDULED = "SCHEDULED",
  LIVE = "LIVE",
  FINISHED = "FINISHED",
}

export enum LineupsStatus {
  CONFIRMED = "CONFIRMED",
  ESTIMATED = "ESTIMATED",
}

export enum LeagueType {
  LEAGUE = "LEAGUE",
  CUP = "CUP",
}

export enum TeamStrength {
  TOP = "TOP",
  MID = "MID",
  LOW = "LOW",
}

export enum PlayerStatus {
  ACTIVE = "ACTIVE",
  INJURED = "INJURED",
  SUSPENDED = "SUSPENDED",
}

export enum PlayerImportance {
  KEY_PLAYER = "KEY_PLAYER",
  ROTATION = "ROTATION",
}

export interface League {
  id: string;
  externalId: string | null;
  seasonId: string | null;
  name: string;
  logoUrl: string | null;
  type: LeagueType;
  importanceLevel: number;
  isActive: boolean;
}

export interface Team {
  id: string;
  externalId: string | null;
  name: string;
  logoUrl: string | null;
  strengthTier: TeamStrength | null;
  styleTags: string[] | null;
  homeStyleTags: string[] | null;
  awayStyleTags: string[] | null;
  league: League | null;
  players: Player[];
}

export interface Player {
  id: string;
  externalId: string | null;
  name: string | null;
  position: string | null;
  jerseyNumber: number | null;
  status: PlayerStatus;
  importance: PlayerImportance | null;
  injuries: Injury[];
  team: Team;
}

export interface Injury {
  id: string;
  type: string;
  expectedReturn: string | null;
  description: string | null;
  createdAt: string;
}

export interface MatchStatistics {
  id: string;
  xg_home: number | null;
  xg_away: number | null;
  corners_home: number | null;
  corners_away: number | null;
  shots_on_target_home: number | null;
  shots_on_target_away: number | null;
  shots_home: number | null;
  shots_away: number | null;
  possession_home: number | null;
  possession_away: number | null;
  fouls_home: number | null;
  fouls_away: number | null;
  offsides_home: number | null;
  offsides_away: number | null;
  cards_yellow_home: number | null;
  cards_yellow_away: number | null;
  cards_red_home: number | null;
  cards_red_away: number | null;
  goals_home: number | null;
  goals_away: number | null;
  attacks_home: number | null;
  attacks_away: number | null;
  dangerous_attacks_home: number | null;
  dangerous_attacks_away: number | null;
  goal_kicks_home: number | null;
  goal_kicks_away: number | null;
  free_kicks_home: number | null;
  free_kicks_away: number | null;
  throw_ins_home: number | null;
  throw_ins_away: number | null;
  crosses_home: number | null;
  crosses_away: number | null;
  saves_home: number | null;
  saves_away: number | null;
  first_half_goals_home: number | null;
  first_half_goals_away: number | null;
  first_half_xg_home: number | null;
  first_half_xg_away: number | null;
}

export interface Odds {
  id: string;
  marketType: string;
  value: number;
  bookmaker: string;
  timestamp: string;
}

export interface Referee {
  id: string;
  name: string;
  sourceExternalId: string | null;
  stats: RefereeStats | null;
  updatedAt: string;
}

export interface RefereeStats {
  id: string;
  avgYellowCards: number;
  avgRedCards: number;
  sampleSizeMatches: number;
  updatedAt: string;
}

export interface Match {
  id: string;
  externalId: string;
  scheduledAt: string | null;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  refereeName: string | null;
  weatherCondition: string | null;
  lineupsStatus: LineupsStatus;
  homeCoachName: string | null;
  awayCoachName: string | null;
  homeFormation: string | null;
  awayFormation: string | null;
  venueName: string | null;
  homeStartingXi: string[] | null;
  awayStartingXi: string[] | null;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  statistics: MatchStatistics | null;
  odds: Odds[];
  createdAt: string;
  updatedAt: string;
}

export interface MatchesFilterInput {
  dateFrom?: string;
  dateTo?: string;
  leagueId?: number;
  status?: MatchStatus;
  teamId?: number;
}
