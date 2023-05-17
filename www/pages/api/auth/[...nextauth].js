import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from "next-auth/providers/credentials";
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
        // try
        // {   
        //     const user = await prisma.user.findFirst({
        //         where: {
        //             email: credentials.email
        //         }
        //     });

        //     if (user !== null)
        //     {
        //         const res = await confirmPasswordHash(credentials.password, user.password);
        //         if (res === true)
        //         {
                   
              
        //             return user;
        //         }
        //         else
        //         {
        //             console.log("Hash not matched logging in");
        //             return null;
        //         }
        //     }
        //     else {
        //         return null;
        //     }
        // }
        // catch (err)
        // {
        //     console.log("Authorize error:", err);
        // }



        
        // credentials contém os dados vindos do frontend
        const { email, password } = credentials;

        // // getUsers contém os dados vindos do backend
        // // const users = await getUsers();
        // const users = [{email: "rmnlpz1", password: "123", role: "admin"}]
        let isAuth;
        // let idx;

        // for (let i = 0; i < users.length; i++) {
        //     const user = users[i];

        //     if (user.email === email && user.password === password) {
        //         isAuth = true;
        //         idx = i;
        //         break;
        //     }

        //     isAuth = false;
        // }

        if (email === "ramon123" && password === "123") {
          isAuth = true;
        }

        if (!isAuth) {
          throw new Error("Invalid credentials");
        }
        const user = {
          nome: "ramon lopes",
          idade: "123",
        };

        return user;
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
    async jwt({ token, user, account, profile, isNewUser }) {
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
    },
  },
  secret: process.env.SECRET,
  pages: {
    signIn: "/index",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};
export default NextAuth(authOptions);
