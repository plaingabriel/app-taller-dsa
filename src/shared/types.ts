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
