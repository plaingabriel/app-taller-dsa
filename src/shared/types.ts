type roles = "admin" | "editor" | "operator";

export interface User {
  ci: number;
  name: string;
  password: string;
  role: roles;
}

export interface UserClient {
  ci: number;
  name: string;
  role: roles;
}

export interface Tournament {
  id: number;
  name: string;
  status: "created" | "started" | "finished";
  creationDate: string;
}

export interface Category {
  id: number;
  name: string;
  min_age: number;
  max_age: number;
  tournament_id: Tournament["id"];
}

export type FixtureType = "groups" | "playoffs" | "groups+playoffs";

export interface Fixture {
  id: number;
  category_id: Category["id"];
  fixture_type: FixtureType;
  team_count: number;
  group_count: number;
  teams_per_group: number;
  teams_qualified: number;
}

export type Phase =
  | {
      id: 1;
      name: "groups";
    }
  | {
      id: 2;
      name: "round_16";
    }
  | {
      id: 3;
      name: "quarterfinals";
    }
  | {
      id: 4;
      name: "semifinals";
    }
  | {
      id: 5;
      name: "final";
    };

export interface Team {
  id: number;
  name: string;
  category_id: Category["id"];
  wins: number;
  losses: number;
  draws: number;
  matches_played: number;
  phase_id: Phase["id"];
  logo?: string;
  players_count: number;
}

export interface Player {
  id: number;
  name: string;
  team_id: Team["id"];
  number: number;
  position: "portero" | "defensa" | "mediocampista" | "delantero";
  goalScored: number;
}

export interface Match {
  id: number;
  home_team: Team["id"];
  away_team: Team["id"];
  phase_id: Phase["id"];
  fixture_id: Fixture["id"];
  home_score?: number;
  away_score?: number;
  date: string;
  location: string;
  day: number;
  match_type?: "group";
}

export interface PlayoffMatch {
  id: number;
  home_penalty_score?: number;
  away_penalty_score?: number;
  home_team?: Team["id"];
  away_team?: Team["id"];
  phase_id: Phase["id"];
  fixture_id: Fixture["id"];
  home_score?: number;
  away_score?: number;
  date: string;
  location: string;
  day: number;
  next_match?: number;
}

export type Config = Pick<
  Fixture,
  "group_count" | "teams_per_group" | "teams_qualified"
>;

export type CategoryClient = Omit<Category, "tournament_id" | "id"> &
  Omit<Fixture, "id" | "category_id">;

export type CategoryFixture = Omit<Category, "tournament_id"> & {
  fixture: Omit<Fixture, "category_id">;
};

export type TournamentFixture = Tournament & {
  categories: CategoryFixture[];
};

export type TournamentClient = Pick<Tournament, "name"> & {
  categories: CategoryClient[];
};

export type NewTeamExcel = Pick<Team, "name" | "logo"> & {
  number_players: number;
};

export type NewTeam = Pick<
  Team,
  "name" | "logo" | "players_count" | "category_id" | "phase_id"
>;

export type TeamPlayers = Pick<
  Team,
  "id" | "name" | "logo" | "players_count"
> & {
  players: Player[];
};

export type NewPlayerExcel = Pick<Player, "name" | "number" | "position">;

export type NewMatch = Omit<Match, "id">;

export type NewPlayoffMatch = Omit<PlayoffMatch, "id">;
