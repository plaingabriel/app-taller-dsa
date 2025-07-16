import { User } from "@/lib/definitions";

export type UserClient = Omit<User, "password">;
