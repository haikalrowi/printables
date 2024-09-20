import { scryptSync } from "node:crypto";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
            Password: {
              password: scryptSync(
                credentials!.password,
                process.env.POSTGRES_PASSWORD!,
                64,
              ).toString("hex"),
            },
          },
        });
        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/dashboard",
  },
};

export default authOptions;
