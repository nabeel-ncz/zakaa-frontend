"use client";
import dynamic from "next/dynamic";

export default function LiveContainer() {
    const LiveStreamContainer = dynamic(() => import("@/components/user/LiveStreamContainer"), {ssr: false});    
    return (
        <>
            <LiveStreamContainer path="student" />
        </>
    )
}
