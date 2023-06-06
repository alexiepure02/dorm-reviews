import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import { compare } from "bcrypt";
import User from "@/common/models/User";

export const authOptions: AuthOptions = {
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
        if (!credentials) {
          return;
        }

        await dbConnect();

        let user: any;

        if (credentials.email.indexOf("@") < 0) {
          user = await User.findOne({
            username: credentials.email,
          });
        } else {
          user = await User.findOne({
            email: credentials.email,
          });
        }

        if (!user) {
          throw new Error("Contul introdus nu există");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
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
      // console.log("session: ", token.sub, " - user: ", session?.user);
      if (token.sub && session?.user) {
        // console.log(token.sub, session?.user);
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      // console.log("jwt: ", user);
      // console.log("token: ", token);
      if (user && account) {
        token.accessToken = account.access_token;
        //@ts-ignore
        token.name = user.username;
        //@ts-ignore
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 48 * 60 * 60, // 48 hrs
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 48 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
