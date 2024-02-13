import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { BASE_URL } from "@/utils/axios";
import { cookies } from "next/headers";
import axios from "axios";

const nextAuthOptions = (req, res) => ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async signIn({ profile }) {

            const response = await axios.post(
                `${BASE_URL}/api/auth/google`,
                profile,
                {
                    withCredentials: true
                }
            );

            if (response?.data?.success) {

                const access = response.headers['set-cookie'][0]?.split("=")[1]?.split(";")[0];
                const refresh = response.headers['set-cookie'][1]?.split("=")[1]?.split(";")[0]

                cookies().set("access_token", access, {
                    path: "/",
                    httpOnly: true
                });
                cookies().set("refresh_token", refresh, {
                    path: "/",
                    httpOnly: true
                });

                return true;
            }

            return false;
        },
    }
});

const handler = async (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res));
};
export { handler as GET, handler as POST };
