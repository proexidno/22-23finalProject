import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import CheckIfUserValid from "model/checkifuservalid";


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

                const res = CheckIfUserValid(login, password)

                const { user } = res

                if (!res.error && res.ok && user) {
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
    pages: {
        signIn: '/auth/signin',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }