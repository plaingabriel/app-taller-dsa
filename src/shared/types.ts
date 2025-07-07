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
