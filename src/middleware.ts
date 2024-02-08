import { BASE_URL } from '@/utils/axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('access_token');
    
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    
    const response = await fetch(
        BASE_URL
    );

    if(!response.ok){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const json: any = response.json();

    if(!json.success){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};