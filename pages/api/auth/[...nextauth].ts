import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import { compare } from "bcrypt";
import User from "@/common/models/User";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Email & Password
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();

        let user: any;

        if (credentials?.email.indexOf("@") < 0) {
          // @ts-ignore
          user = await User.findOne({
            username: credentials?.email,
          });
        } else {
          // @ts-ignore
          user = await User.findOne({
            email: credentials?.email,
          });
        }

        if (!user) {
          throw new Error("Contul introdus nu există");
        }

        const isPasswordCorrect = await compare(
          credentials?.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Parola este incorectă");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
