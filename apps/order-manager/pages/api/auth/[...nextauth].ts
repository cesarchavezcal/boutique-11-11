import { PrismaClient } from '@prisma/client';
import FacebookProvider from 'next-auth/providers/facebook';
// import InstagramProvider from 'next-auth/providers/instagram';
// import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  debug: false,
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // InstagramProvider({
    //   clientId: process.env.INSTAGRAM_CLIENT_ID,
    //   clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    // }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, account, profile, user, isNewUser }) {
      if (account) {
        token.accessToken = account.id_token;
        token.tokenType = account.token_type;
        token.uid = user?.id;
        token.isNewUser = isNewUser;
        token.phone = user.phone;
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.isNewUser = token.isNewUser;
        session.user.accessToken = token.accessToken;
        session.user.tokenType = token.tokenType;
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
