type roles = "admin" | "editor" | "operator";

export interface User {
  ci: number;
  name: string;
  password: string;
  role: roles;
}

export interface Tournament {
  id: string;
  name: string;
  status: "created" | "started" | "finished";
  creation_date: string;
}

export type FixtureType = "groups" | "playoffs" | "groups+playoffs";

export interface Category {
  id: string;
  tournament_id: Tournament["id"];
  name: string;
  min_age: number;
  max_age: number;
  fixture_type: FixtureType;
  team_count: number;
  group_count: number;
  teams_per_group: number;
  teams_qualified: number;
  has_fixture?: boolean;
}

export type NewCategory = Omit<Category, "id" | "tournament_id">;

export type Phase =
  | "groups"
  | "round_16"
  | "quarterfinals"
  | "semifinal"
  | "final";

export interface Team {
  id: string;
  category_id: Category["id"];
  name: string;
  players_count: number;
  wins?: number;
  losses?: number;
  draws?: number;
  logo?: string;
  has_validated_players?: boolean;
  goals_count?: number;
  goals_against?: number;
  points?: number;
  group?: string;
  phase?: Phase;
}

export type NewTeamExcel = Pick<Team, "name" | "logo" | "players_count">;

export interface Player {
  ci: number;
  team_id: Team["id"];
  name: string;
  jersey_number: number;
  position: "portero" | "defensa" | "mediocampista" | "delantero";
  goals_scored: number;
  age: number;
}

export type NewPlayerExcel = Omit<Player, "team_id" | "goals_scored">;

export type TeamPlayers = Team & { players: Player[] };
export type CategoryTeamsPlayers = Category & {
  teams: TeamPlayers[];
};

export interface Match {
  id: string;
  category_id: Category["id"];
  home_team?: Team["id"];
  away_team?: Team["id"];
  home_score?: number;
  away_score?: number;
  date?: string;
  status?: "pending" | "finished";
}

export type PlayoffMatch = Match & {
  home_penalty_score?: number;
  away_penalty_score?: number;
  next_match?: Match["id"];
  phase?: Phase;
};

type GroupMatch = Match & {
  day: number;
};

export interface Group {
  id: string;
  name: string;
  matches: GroupMatch[];
}
