import { BASE_URL } from '@/utils/axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function authExistMiddleware(req: NextRequest) {

    try {

        const path = req.nextUrl.pathname;

        const access_token = req.cookies.get("access_token")?.value;
        const refresh_token = req.cookies.get("refresh_token")?.value;

        const response = await fetch(
            `${BASE_URL}/api/auth`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `access_token=${access_token}; refresh_token=${refresh_token}`
                },
            }
        ).then((response: any) => {
            return response.json()
                .then((data: any) => {
                    return data;
                });
        });

        if (response?.success) {
            if (!response?.data?.isVerified && path.startsWith("/auth/verify")) {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();

    } catch (error: any) {
        return NextResponse.next();
    }

}