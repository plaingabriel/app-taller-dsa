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

export interface TournamentData {
  name: string;
  numberOfCategories: number;
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
export type Config = Pick<
  Fixture,
  "group_count" | "teams_per_group" | "teams_qualified"
>;

export type CategoryClient = Omit<Category, "tournament_id" | "id"> &
  Omit<Fixture, "id" | "category_id">;

export type TournamentClient = Pick<Tournament, "name"> & {
  categories: CategoryClient[];
};
