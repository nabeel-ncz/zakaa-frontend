"use client";
import Header from "@/components/common/Header";
import Footer from "@/components/home/Footer";
import MentorSectionCardLoading from "@/components/home/MentorSectionCardLoading";
import { useState } from "react";

export default function page() {

    const [loading, setLoading] = useState<boolean>(true);
    const [mentors, setMentors] = useState<any>(null);

    return (
        <>
            <Header />
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                {(!loading && (!mentors || mentors?.length === 0)) && (
                    <div className="w-full pt-6 flex flex-col gap-2 items-center justify-center">
                        <h2 className="font-bold text-xl pb-6">Unfortunately, there are no instructors available!</h2>
                        <img src="/icons/not-found.png" alt="" className="h-80" />
                    </div>
                )}
                {loading && (
                    <div className="flex flex-wrap -mx-4">
                        <>
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                        </>
                        <>
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                        </>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}
