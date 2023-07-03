import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import ServiceUser from "@/logic/services/user/ServiceUsers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const service = new ServiceUser();
          const user = await service.auth(credentials);
          return user ? user : null;
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, user }) {
      console.log(user)
      if (user) {
        // pass the role of user to token
        token.user = user;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, user, token }) {
      // pass the role to client session
      if (token) {
        session.user = token.user;
        session.role = token.role;
      }

      return session;
    }
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};
export default NextAuth(authOptions);
