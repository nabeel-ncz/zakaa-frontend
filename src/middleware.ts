import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
    studentMiddleware,
    instructorMiddleware,
    adminMiddleware,
    authExistMiddleware
} from '@/server';

export async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname;

    if (path.startsWith('/auth')) {
        return authExistMiddleware(req);

    } else if (path.startsWith('/student')) {
        return studentMiddleware(req);

    } else if (path.startsWith('/instructor')) {
        return instructorMiddleware(req);

    } else if (path.startsWith('/admin')) {
        return adminMiddleware(req);

    } else {
        return NextResponse.next();
    }

}

export const config = {
    matcher: ["/auth/:path*", "/student/:path*", "/instructor/:path*", "/admin/:path*"],
};