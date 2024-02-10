import { BASE_URL } from '@/utils/axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function instructorMiddleware(req: NextRequest) {

    try {

        const access_token = req.cookies.get("access_token")?.value;
        const refresh_token = req.cookies.get("refresh_token")?.value;
        
        if (!access_token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

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

        if (!response?.success) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if(response?.data?.role !== "instructor"){
            return NextResponse.redirect(new URL("/login", req.url));
        }

        return NextResponse.next();

    } catch (error: any) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

}