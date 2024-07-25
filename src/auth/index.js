import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/model/userModel";
import bcrypt from "bcryptjs";

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
                
                try {
                  console.time('findUser');
                  const user = await User.findOne({ email: credentials?.email });
                  console.timeEnd('findUser');
                  
                  if (user) {
                    console.time('comparePassword');
                    const isMatch = await bcrypt.compare(credentials.password, user.password);
                    console.timeEnd('comparePassword');
                    
                    if (isMatch) {
                      return user;
                    } else {
                      console.log('Password mismatch');
                      throw new Error("Email or Password is not correct");
                    }
                  } else {
                    console.log('User not found');
                    throw new Error("User not found");
                  }
                } catch (error) {
                  console.error('Authorization error:', error);
                  throw new Error(error);
                }
              },
        })
    ],
});