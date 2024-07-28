import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/model/userModel";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongo";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        await connectDB();

        console.time("Authorization Process");
        try {
          console.time("Find User");
          const user = await User.findOne({ email: credentials?.email }).exec();
          console.timeEnd("Find User");

          if (user) {
            console.time("Compare Password");
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            console.timeEnd("Compare Password");

            if (isMatch) {
              console.timeEnd("Authorization Process");
              return { id: user._id, email: user.email, name: user.name }; // Include user ID
            } else {
              console.timeEnd("Authorization Process");
              throw new Error("Email or Password is not correct");
            }
          } else {
            console.timeEnd("Authorization Process");
            throw new Error("User not found");
          }
        } catch (error) {
          console.timeEnd("Authorization Process");
          throw new Error(error.message);
        }
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Add the user ID to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add the user ID to the JWT token
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page if you have one
  },
});
