"use client";
import Loading from "@/components/ui/Loading";
import { TypeDispatch } from "@/store";
import { verifyInstructorAction } from "@/store/actions/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function VerifyInstructor() {

    const searchParams = useSearchParams();
    const dispatch: TypeDispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get("token");
        dispatch(verifyInstructorAction(token as string))
            .finally(() => {
                router.replace("/");
            })
    }, []);

    return (
        <>
            <Loading />
        </>
    )
}
