import type { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { Role } from "@/common/Constants";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      username: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Role;
  }
}

// interface IUser extends DefaultUser {
//   id?: string;
//   username?: string;
//   role?: Role;
// }
// declare module "next-auth" {
//   interface User extends IUser {}
//   interface Session {
//     user?: User;
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT extends IUser {}
// }
