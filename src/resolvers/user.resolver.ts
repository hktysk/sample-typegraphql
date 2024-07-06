import { Resolver, Query } from "type-graphql";
import { User } from "../schemas/user";

@Resolver(User)
export class UserResolver {
  private users: User[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
  ];

  @Query(() => [User])
  getUsers(): User[] {
    return this.users;
  }
}

