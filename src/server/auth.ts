import NextAuth, {
    type NextAuthConfig,
    type DefaultSession,
    type User,
} from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
interface CommonAuthFields {
    grpcToken: string;
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: User;
    }

    interface User extends CommonAuthFields {
        id?: string;
        email?: string | null;
        name?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends CommonAuthFields, DefaultJWT { }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const validatedFields = z.object({
                    email: z.string().email(),
                    password: z.string().min(6),
                }).safeParse(credentials);

                if (!validatedFields.success) return null;

                const { email, password } = validatedFields.data;

                const user = {
                    id: "1",
                    email,
                    name: "Test User",
                    grpcToken: "test-gr"
                } satisfies User

                if (!user) return null;

                return user;
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    trustHost: true
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({

    callbacks: {
        session: ({ token, session }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
                grpcToken: token.grpcToken
            }
        }),
        async jwt({ token, user }) {
            if (user) {
                token.grpcToken = user.grpcToken;
            }

            return token;
        },
    },
    session: { strategy: 'jwt' },
    ...authOptions,
});
