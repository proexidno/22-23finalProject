import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

const loginC = "admin123", passwordC = "1234"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                login: { label: "login", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { login, password } = credentials

                const res = await fetch("http://localhost:3000/api/dbmanager/checkifuserexists", {
                    "method": 'POST',
                    "cache": 'no-store',
                    "body": JSON.stringify({ login, password }),
                    headers: { "Content-Type": "application/json" },
                })
                
                const user = await res.json()
                console.log(user);
                
                if (res.ok && user && !user.error) {
                    return user
                } else {
                    return null
                }
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }