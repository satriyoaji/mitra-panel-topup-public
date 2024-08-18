import type { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetCredHeader } from "../../api-utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        var credentialHeader = GetCredHeader();

        const response = await fetch(
          `${process.env.NEXT_API_URL}/v2/panel/member/login`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "X-Sign": credentialHeader.sign,
              "X-User-Id": credentialHeader.mitraid,
              "X-Timestamp": credentialHeader.timestamp.toString(),
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          }
        );

        var res = await response.json();
        if (response.ok) return res.data;
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.profile = user.profile;
      }
      return token;
    },
    session: async ({ session, token }) => {
      var credentialHeader = GetCredHeader();

      let response = await fetch(
        `${process.env.NEXT_API_URL}/v2/panel/member/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Sign": credentialHeader.sign,
            "X-User-Id": credentialHeader.mitraid,
            "X-Timestamp": credentialHeader.timestamp.toString(),
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      var res = await response.json();
      if (response.ok) {
        session.token = token.token;
        session.profile = res.data;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};
