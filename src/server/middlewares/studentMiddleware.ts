import { BASE_URL } from '@/utils/axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function studentMiddleware(req: NextRequest) {

    try {

        const access_token = req.cookies.get("access_token")?.value;
        const refresh_token = req.cookies.get("refresh_token")?.value;
        
        console.log(access_token, refresh_token, "================================");
        
        if (!access_token) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        const response = await fetch(`${BASE_URL}/api/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `access_token=${access_token}; refresh_token=${refresh_token}`
            },
        });

        console.log(response.ok, "resposnse.ok");
    
        if (!response.ok) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    
        const data: any = await response.json();

        console.log(data, "================================");

        if (!data?.success) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        if(data?.data?.role !== "student"){
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        if(!data?.data?.isVerified){
            return NextResponse.redirect(new URL("/auth/verify", req.url));
        }

        return NextResponse.next();

    } catch (error: any) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

}